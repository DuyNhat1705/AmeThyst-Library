import { describe, it, expect, vi, beforeEach } from 'vitest';
import pool from '../../src/config/postgres.mjs';
import {
  createReservation,
  cancelReservation,
  generateRoomPin,
  cleanupRoomPin,
  confirmCheckout,
  getRoomHistory,
  MAX_ROOM_RESERVE_LIMIT,
} from '../../src/services/room.services.mjs';
import { backfillDefaultedCheckouts } from '../../src/models/room.models.mjs';

vi.mock('../../src/config/postgres.mjs', () => {
  const queryMock = vi.fn();
  const connectMock = vi.fn();
  return {
    default: {
      query: queryMock,
      connect: connectMock,
    },
  };
});

const buildClientMock = () => ({
  query: vi.fn(),
  release: vi.fn(),
});

describe('room.services.mjs - reserve_num lifecycle and limit guard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createReservation', () => {
    it('increments users.reserve_num inside the same transaction as the insert', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ reserve_num: 2 }] }) // findUserReserveNum
        .mockResolvedValueOnce({
          rows: [{ reserveId: 'r1', availId: 3, startDate: '2026-08-01', status: 'reserved' }],
        }) // createReservation insert
        .mockResolvedValueOnce({ rowCount: 1 }) // incrementReserveNum
        .mockResolvedValueOnce({ rows: [] }); // COMMIT
      pool.connect.mockResolvedValueOnce(clientMock);

      const reservation = await createReservation('u1', 3, '2026-08-01');

      expect(pool.connect).toHaveBeenCalled();
      expect(clientMock.query).toHaveBeenNthCalledWith(1, 'BEGIN');
      expect(clientMock.query.mock.calls[2][0]).toContain('INSERT INTO reserve_room');
      expect(clientMock.query.mock.calls[3][0]).toContain('reserve_num = reserve_num + 1');
      expect(clientMock.query).toHaveBeenNthCalledWith(5, 'COMMIT');
      expect(clientMock.release).toHaveBeenCalled();
      expect(reservation).toEqual({ reserveId: 'r1', availId: 3, startDate: '2026-08-01', status: 'reserved' });
    });

    it('rejects with ROOM_RESERVE_LIMIT_EXCEEDED when reserve_num reaches the limit', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ reserve_num: MAX_ROOM_RESERVE_LIMIT }] }) // findUserReserveNum
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);

      await expect(createReservation('u1', 3, '2026-08-01')).rejects.toMatchObject({
        code: 'ROOM_RESERVE_LIMIT_EXCEEDED',
        status: 400,
      });

      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.query).not.toHaveBeenCalledWith(expect.stringContaining('INSERT INTO reserve_room'));
      expect(clientMock.release).toHaveBeenCalled();
    });

    it('rejects when reserve_num exceeds the limit', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ reserve_num: MAX_ROOM_RESERVE_LIMIT + 2 }] })
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);

      await expect(createReservation('u1', 3, '2026-08-01')).rejects.toMatchObject({
        code: 'ROOM_RESERVE_LIMIT_EXCEEDED',
      });
    });

    it('rejects when the atomic increment is blocked, rolling back the insert', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ reserve_num: MAX_ROOM_RESERVE_LIMIT - 1 }] }) // findUserReserveNum (passes pre-check)
        .mockResolvedValueOnce({ rows: [{ reserveId: 'r1', availId: 3, startDate: '2026-08-01' }] }) // INSERT
        .mockResolvedValueOnce({ rowCount: 0 }) // incrementReserveNum blocked
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);

      await expect(createReservation('u1', 3, '2026-08-01')).rejects.toMatchObject({
        code: 'ROOM_RESERVE_LIMIT_EXCEEDED',
        status: 400,
      });

      expect(clientMock.query.mock.calls[2][0]).toContain('INSERT INTO reserve_room');
      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.query).not.toHaveBeenCalledWith('COMMIT');
      expect(clientMock.release).toHaveBeenCalled();
    });
  });

  describe('cancelReservation', () => {
    it('decrements users.reserve_num in the same transaction after deleting the reservation', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rowCount: 1 }) // DELETE reserve_room
        .mockResolvedValueOnce({ rowCount: 1 }) // decrementReserveNum
        .mockResolvedValueOnce({ rows: [] }); // COMMIT
      pool.connect.mockResolvedValueOnce(clientMock);

      const result = await cancelReservation('r1', 'u1');

      expect(clientMock.query).toHaveBeenNthCalledWith(1, 'BEGIN');
      expect(clientMock.query.mock.calls[1][0]).toContain('DELETE FROM reserve_room');
      expect(clientMock.query.mock.calls[2][0]).toContain('GREATEST(reserve_num - 1, 0)');
      expect(clientMock.query).toHaveBeenNthCalledWith(4, 'COMMIT');
      expect(clientMock.release).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('rolls back and throws 404 when the reservation is not cancellable', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rowCount: 0 }) // no row deleted
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);

      await expect(cancelReservation('missing', 'u1')).rejects.toMatchObject({ status: 404 });

      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.query).not.toHaveBeenCalledWith(expect.stringContaining('GREATEST(reserve_num - 1, 0)'));
    });
  });

  describe('generateRoomPin', () => {
    it('returns RESERVATION_NOT_FOUND when the reservation is not owned or invalid status', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // ownership/status check

      const result = await generateRoomPin('u1', 'missing');

      expect(result.error.code).toBe('RESERVATION_NOT_FOUND');
      expect(result.statusCode).toBe(404);
    });

    it('returns the existing active PIN without generating a new one (idempotent)', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ reserve_id: 'r1', user_id: 'u1' }] }) // ownership/status check
        .mockResolvedValueOnce({ rows: [{ pin: '482913', expired_at: '2026-08-01T09:33:00.000Z' }] }); // active PIN

      const result = await generateRoomPin('u1', 'r1');

      expect(result).toEqual({ pin: '482913', expiresAt: '2026-08-01T09:33:00.000Z' });
      expect(pool.query.mock.calls[1][0]).toContain('expired_at > NOW()');
    });

    it('resets a stale PIN, transitions status to pending, and sets a 3-minute expiry', async () => {
      const now = Date.now();
      vi.useFakeTimers();
      vi.setSystemTime(now);

      pool.query
        .mockResolvedValueOnce({ rows: [{ reserve_id: 'r1', user_id: 'u1' }] }) // ownership/status check
        .mockResolvedValueOnce({ rows: [] }) // no active PIN
        .mockResolvedValueOnce({ rowCount: 1 }) // reset stale PIN
        .mockResolvedValueOnce({ rowCount: 1 }); // update with new PIN

      const result = await generateRoomPin('u1', 'r1');

      expect(pool.query.mock.calls[2][0]).toContain("status = 'reserved'");
      const updateSql = pool.query.mock.calls[3][0];
      expect(updateSql).toContain('reserve_room');
      expect(updateSql).toContain("status = 'pending'");
      expect(result.pin).toMatch(/^\d{6}$/);
      const expiresAtMs = new Date(result.expiresAt).getTime();
      expect(expiresAtMs - now).toBe(3 * 60 * 1000);
      vi.useRealTimers();
    });

    it('retries on uniqueness violation and fails after 3 attempts', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ reserve_id: 'r1', user_id: 'u1' }] }) // ownership/status check
        .mockResolvedValueOnce({ rows: [] }) // no active PIN
        .mockResolvedValueOnce({ rowCount: 1 }) // reset stale PIN
        .mockRejectedValueOnce({ code: '23505' }) // attempt 1: unique violation
        .mockRejectedValueOnce({ code: '23505' }) // attempt 2: unique violation
        .mockRejectedValueOnce({ code: '23505' }); // attempt 3: unique violation

      const result = await generateRoomPin('u1', 'r1');

      expect(result.error.code).toBe('PIN_GENERATION_FAILED');
      expect(result.statusCode).toBe(500);
    });
  });

  describe('cleanupRoomPin', () => {
    it('clears the pending PIN back to reserved', async () => {
      pool.query.mockResolvedValueOnce({ rowCount: 1 });

      const result = await cleanupRoomPin('u1', 'r1');

      expect(pool.query.mock.calls[0][0]).toContain('UPDATE reserve_room');
      expect(pool.query.mock.calls[0][0]).toContain("status = 'pending'");
      expect(result).toEqual({ cleaned: true });
    });

    it('returns cleaned: false when no active pending PIN exists', async () => {
      pool.query.mockResolvedValueOnce({ rowCount: 0 });

      const result = await cleanupRoomPin('u1', 'r1');

      expect(result).toEqual({ cleaned: false });
    });
  });

  describe('confirmCheckout', () => {
    it('creates a return_room record and decrements reserve_num for an elapsed used reservation', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }) // findReturnRecord (none)
        .mockResolvedValueOnce({
          rows: [{ reserveId: 'r1', userId: 'u1', status: 'used', startDate: '2026-07-30', endTime: '18:00:00' }],
        }) // findReservationOwnedBy
        .mockResolvedValueOnce({ rows: [] }) // findReturnRecord (inside checkoutRoom)
        .mockResolvedValueOnce({ rowCount: 1 }) // INSERT return_room
        .mockResolvedValueOnce({ rowCount: 1 }) // UPDATE users reserve_num
        .mockResolvedValueOnce({ rows: [{ returnId: 'ret1', checkoutTime: '2026-07-30T18:05:00' }] }) // findReturnRecord after insert
        .mockResolvedValueOnce({ rows: [] }); // COMMIT
      pool.connect.mockResolvedValueOnce(clientMock);

      const result = await confirmCheckout('u1', 'r1');

      expect(clientMock.query.mock.calls[4][0]).toContain('INSERT INTO public.return_room');
      expect(clientMock.query.mock.calls[5][0]).toContain('GREATEST(reserve_num - 1, 0)');
      expect(clientMock.query).toHaveBeenNthCalledWith(8, 'COMMIT');
      expect(clientMock.release).toHaveBeenCalled();
      expect(result).toEqual({ alreadyCheckedOut: false, returnId: 'ret1', checkoutTime: '2026-07-30T18:05:00' });
    });

    it('returns the existing return record idempotently on a duplicate call', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ returnId: 'ret1', checkoutTime: '2026-07-30T18:00:00' }] }) // findReturnRecord
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);

      const result = await confirmCheckout('u1', 'r1');

      expect(result).toEqual({ alreadyCheckedOut: true, returnId: 'ret1', checkoutTime: '2026-07-30T18:00:00' });
      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.release).toHaveBeenCalled();
    });

    it('rejects with RESERVATION_NOT_FOUND when the reservation is not owned by the user', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }) // findReturnRecord
        .mockResolvedValueOnce({ rows: [] }) // findReservationOwnedBy
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);

      await expect(confirmCheckout('u1', 'r1')).rejects.toMatchObject({
        code: 'RESERVATION_NOT_FOUND',
        status: 404,
      });
      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.release).toHaveBeenCalled();
    });

    it('rejects with CHECKOUT_NOT_ELIGIBLE when the reservation is not used', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }) // findReturnRecord
        .mockResolvedValueOnce({
          rows: [{ reserveId: 'r1', userId: 'u1', status: 'pending', startDate: '2026-07-30', endTime: '18:00:00' }],
        }) // findReservationOwnedBy
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);

      await expect(confirmCheckout('u1', 'r1')).rejects.toMatchObject({
        code: 'CHECKOUT_NOT_ELIGIBLE',
        status: 409,
      });
      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.release).toHaveBeenCalled();
    });

    it('rejects with CHECKOUT_NOT_ELIGIBLE when the reservation slot has not ended yet', async () => {
      const futureStart = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }) // findReturnRecord
        .mockResolvedValueOnce({
          rows: [{ reserveId: 'r1', userId: 'u1', status: 'used', startDate: futureStart, endTime: '23:59:00' }],
        }) // findReservationOwnedBy
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);

      await expect(confirmCheckout('u1', 'r1')).rejects.toMatchObject({
        code: 'CHECKOUT_NOT_ELIGIBLE',
        status: 409,
      });
      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.release).toHaveBeenCalled();
    });
  });

  describe('backfillDefaultedCheckouts', () => {
    it('inserts return_room rows with slot end_time and decrements reserve_num', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ reserve_id: 'r1' }, { reserve_id: 'r2' }] }) // INSERT ... RETURNING
        .mockResolvedValueOnce({ rowCount: 2 }); // UPDATE users

      const backfilled = await backfillDefaultedCheckouts();

      expect(pool.query.mock.calls[0][0]).toContain('INSERT INTO public.return_room');
      expect(pool.query.mock.calls[0][0]).toContain("status = 'used'");
      expect(pool.query.mock.calls[0][0]).toContain("interval '15 minutes'");
      expect(pool.query.mock.calls[0][0]).toContain('NOT EXISTS');
      expect(backfilled).toBe(2);
    });

    it('skips the reserve_num decrement when nothing is backfilled', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const backfilled = await backfillDefaultedCheckouts();

      expect(backfilled).toBe(0);
      expect(pool.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRoomHistory', () => {
    it('rejects an invalid from date format', async () => {
      await expect(getRoomHistory('u1', 'not-a-date', undefined)).rejects.toThrow();
    });

    it('rejects an invalid to date format', async () => {
      await expect(getRoomHistory('u1', undefined, 'not-a-date')).rejects.toThrow();
    });

    it('applies inclusive from/to filters on start_date and returns rows', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ reserveId: 'r1', startDate: '2026-07-20' }] });

      const rows = await getRoomHistory('u1', '2026-07-01', '2026-08-01');

      expect(pool.query.mock.calls[0][0]).toContain('start_date >= $2::date');
      expect(pool.query.mock.calls[0][0]).toContain('start_date <= $3::date');
      expect(pool.query.mock.calls[0][0]).toContain('ORDER BY rr.start_date DESC');
      expect(rows).toEqual([{ reserveId: 'r1', startDate: '2026-07-20' }]);
    });
  });
});
