import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/config/postgres.mjs', () => ({
  default: {
    query: vi.fn(),
    connect: vi.fn(),
  },
}));

vi.mock('../../src/models/room.models.mjs', () => ({
  findPendingRoomReservationByPin: vi.fn(),
  findReservationBranch: vi.fn(),
  confirmRoomCheckin: vi.fn(),
}));

import pool from '../../src/config/postgres.mjs';
import * as roomModel from '../../src/models/room.models.mjs';
import { verifyRoomPin, confirmRoomCheckin } from '../../src/services/dashboard.librarian.services.mjs';

const buildClientMock = () => ({
  query: vi.fn(),
  release: vi.fn(),
});

describe('dashboard.librarian.services.mjs - room PIN verification & check-in', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('verifyRoomPin', () => {
    it('returns reservation/user/room details for a valid pending PIN at the librarian branch', async () => {
      roomModel.findPendingRoomReservationByPin.mockResolvedValueOnce({
        reserveId: 'r1',
        userId: 'u1',
        startDate: '2026-08-01',
        startTime: '09:00:00',
        endTime: '10:00:00',
        username: 'alice',
        gender: 'female',
        phoneNumber: '0123456789',
        email: 'alice@example.com',
        avatar: null,
        roomName: 'Room A',
        description: 'Study room',
        capacity: 6,
        imgUrl: null,
        branchId: 1,
        branchName: 'Branch 1',
        branchAddress: '1 Main St',
      });

      const result = await verifyRoomPin('123456', 1);

      expect(roomModel.findPendingRoomReservationByPin).toHaveBeenCalledWith('123456');
      expect(result).toEqual({
        reserveId: 'r1',
        reservation: { startDate: '2026-08-01', startTime: '09:00:00', endTime: '10:00:00' },
        user: {
          userId: 'u1',
          username: 'alice',
          gender: 'female',
          phoneNumber: '0123456789',
          email: 'alice@example.com',
          avatar: null,
        },
        room: {
          roomName: 'Room A',
          description: 'Study room',
          capacity: 6,
          imgUrl: null,
          branchName: 'Branch 1',
          branchAddress: '1 Main St',
        },
      });
    });

    it('returns WRONG_BRANCH when the reservation belongs to another branch', async () => {
      roomModel.findPendingRoomReservationByPin.mockResolvedValueOnce({
        reserveId: 'r1',
        branchId: 2,
        branchName: 'Branch 2',
        branchAddress: '2 Main St',
      });

      const result = await verifyRoomPin('123456', 1);

      expect(result.error.code).toBe('WRONG_BRANCH');
      expect(result.statusCode).toBe(403);
    });

    it('returns PIN_NOT_FOUND for an invalid or expired PIN', async () => {
      roomModel.findPendingRoomReservationByPin.mockResolvedValueOnce(null);

      const result = await verifyRoomPin('000000', 1);

      expect(roomModel.findPendingRoomReservationByPin).toHaveBeenCalledWith('000000');
      expect(result.error.code).toBe('PIN_NOT_FOUND');
      expect(result.statusCode).toBe(404);
    });
  });

  describe('confirmRoomCheckin', () => {
    it('transitions a pending reservation to used, clears the PIN, and commits', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }); // COMMIT
      pool.connect.mockResolvedValueOnce(clientMock);
      roomModel.findReservationBranch.mockResolvedValueOnce({ branchId: 1 });
      roomModel.confirmRoomCheckin.mockResolvedValueOnce(true);

      const result = await confirmRoomCheckin('r1', 1);

      expect(pool.connect).toHaveBeenCalled();
      expect(clientMock.query).toHaveBeenNthCalledWith(1, 'BEGIN');
      expect(roomModel.findReservationBranch).toHaveBeenCalledWith('r1', clientMock);
      expect(roomModel.confirmRoomCheckin).toHaveBeenCalledWith('r1', clientMock);
      expect(clientMock.query).toHaveBeenCalledWith('COMMIT');
      expect(clientMock.release).toHaveBeenCalled();
      expect(result).toEqual({ success: true, reserveId: 'r1', status: 'used' });
    });

    it('rolls back and returns WRONG_BRANCH when the reservation belongs to another branch', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);
      roomModel.findReservationBranch.mockResolvedValueOnce({ branchId: 2 });

      const result = await confirmRoomCheckin('r1', 1);

      expect(roomModel.findReservationBranch).toHaveBeenCalledWith('r1', clientMock);
      expect(roomModel.confirmRoomCheckin).not.toHaveBeenCalled();
      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.release).toHaveBeenCalled();
      expect(result.error.code).toBe('WRONG_BRANCH');
      expect(result.statusCode).toBe(403);
    });

    it('rolls back and returns NOT_FOUND when the reservation does not exist', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);
      roomModel.findReservationBranch.mockResolvedValueOnce(null);

      const result = await confirmRoomCheckin('r1', 1);

      expect(roomModel.confirmRoomCheckin).not.toHaveBeenCalled();
      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.release).toHaveBeenCalled();
      expect(result.error.code).toBe('NOT_FOUND');
      expect(result.statusCode).toBe(404);
    });

    it('rolls back and returns NOT_FOUND when the reservation is not pending or already used', async () => {
      const clientMock = buildClientMock();
      clientMock.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
      pool.connect.mockResolvedValueOnce(clientMock);
      roomModel.findReservationBranch.mockResolvedValueOnce({ branchId: 1 });
      roomModel.confirmRoomCheckin.mockResolvedValueOnce(false);

      const result = await confirmRoomCheckin('r1', 1);

      expect(roomModel.confirmRoomCheckin).toHaveBeenCalledWith('r1', clientMock);
      expect(clientMock.query).toHaveBeenCalledWith('ROLLBACK');
      expect(clientMock.release).toHaveBeenCalled();
      expect(result.error.code).toBe('NOT_FOUND');
      expect(result.statusCode).toBe(404);
    });
  });
});
