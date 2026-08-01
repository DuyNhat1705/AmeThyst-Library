import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/config/postgres.mjs', () => ({
  default: {
    query: vi.fn(),
    connect: vi.fn(),
  },
}));

vi.mock('../../src/models/room.models.mjs', () => ({
  getRoomsOverviewStats: vi.fn(),
  findActiveReservations: vi.fn(),
  findRoomSchedule: vi.fn(),
  findReservationDetail: vi.fn(),
}));

import pool from '../../src/config/postgres.mjs';
import * as roomModel from '../../src/models/room.models.mjs';
import { getRoomsOverview, getActiveReservations, getRoomSchedule, getReservationDetail } from '../../src/services/dashboard.librarian.services.mjs';

describe('dashboard.librarian.services.mjs - room dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getRoomsOverview', () => {
    it('returns branch-scoped overview stats for a branch', async () => {
      roomModel.getRoomsOverviewStats.mockResolvedValueOnce({
        totalBookingsToday: 24,
        occupied: 18,
        totalRooms: 20,
        pendingCheckins: 6,
      });

      const result = await getRoomsOverview(1);

      expect(roomModel.getRoomsOverviewStats).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        branchId: 1,
        totalBookingsToday: 24,
        occupied: 18,
        totalRooms: 20,
        pendingCheckins: 6,
      });
    });

    it('returns zeroed stats for a branch with no data', async () => {
      roomModel.getRoomsOverviewStats.mockResolvedValueOnce({
        totalBookingsToday: 0,
        occupied: 0,
        totalRooms: 0,
        pendingCheckins: 0,
      });

      const result = await getRoomsOverview(2);

      expect(roomModel.getRoomsOverviewStats).toHaveBeenCalledWith(2);
      expect(result).toEqual({
        branchId: 2,
        totalBookingsToday: 0,
        occupied: 0,
        totalRooms: 0,
        pendingCheckins: 0,
      });
    });

    it('passes through the librarian branch id (isolation key)', async () => {
      roomModel.getRoomsOverviewStats.mockResolvedValueOnce({});

      await getRoomsOverview(3);

      expect(roomModel.getRoomsOverviewStats).toHaveBeenCalledWith(3);
      expect(pool.query).not.toHaveBeenCalled();
    });
  });

  describe('getActiveReservations', () => {
    it('returns paginated items with filters forwarded to the model', async () => {
      roomModel.findActiveReservations.mockResolvedValueOnce({
        items: [
          {
            reserveId: 'r1',
            roomName: 'Room A1',
            location: '3rd Floor, North Wing',
            capacity: 6,
            user: { userId: 'u1', username: 'minhng', avatar: null },
            date: '2026-08-01',
            startTime: '09:30:00',
            endTime: '11:30:00',
            durationMinutes: 120,
            status: 'in_progress',
            branchId: 1,
          },
        ],
        pagination: { page: 1, limit: 10, total: 24, totalPages: 3 },
      });

      const result = await getActiveReservations(1, { search: 'minh', status: 'in_progress', from: '2026-08-01', to: '2026-08-31', page: 1, limit: 10 });

      expect(roomModel.findActiveReservations).toHaveBeenCalledWith(1, {
        search: 'minh',
        status: 'in_progress',
        from: '2026-08-01',
        to: '2026-08-31',
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(1);
      expect(result.pagination).toEqual({ page: 1, limit: 10, total: 24, totalPages: 3 });
    });

    it('maps used-with-return to completed status', async () => {
      roomModel.findActiveReservations.mockResolvedValueOnce({
        items: [
          {
            reserveId: 'r2',
            roomName: 'Room B2',
            location: '2nd Floor',
            capacity: 4,
            user: { userId: 'u2', username: 'lananh', avatar: null },
            date: '2026-08-01',
            startTime: '08:00:00',
            endTime: '10:00:00',
            durationMinutes: 120,
            status: 'completed',
            branchId: 1,
          },
        ],
        pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
      });

      const result = await getActiveReservations(1, { status: 'completed' });

      expect(roomModel.findActiveReservations).toHaveBeenCalledWith(1, { status: 'completed' });
      expect(result.items[0].status).toBe('completed');
    });

    it('forwards branch id for isolation even with empty filters', async () => {
      roomModel.findActiveReservations.mockResolvedValueOnce({ items: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } });

      const result = await getActiveReservations(2, {});

      expect(roomModel.findActiveReservations).toHaveBeenCalledWith(2, {});
      expect(result.items).toEqual([]);
    });
  });

  describe('getRoomSchedule', () => {
    it('computes the Monday..Sunday week range for view=week', async () => {
      roomModel.findRoomSchedule.mockResolvedValueOnce({ rooms: [], events: [] });

      const result = await getRoomSchedule(1, '2026-07-30', null, 'week');

      expect(roomModel.findRoomSchedule).toHaveBeenCalledWith(1, '2026-07-27', '2026-08-02');
      expect(result).toEqual({ branchId: 1, rooms: [], events: [] });
    });

    it('passes through a day range for view=day', async () => {
      roomModel.findRoomSchedule.mockResolvedValueOnce({ rooms: [], events: [] });

      const result = await getRoomSchedule(1, '2026-08-01', '2026-08-01', 'day');

      expect(roomModel.findRoomSchedule).toHaveBeenCalledWith(1, '2026-08-01', '2026-08-01');
      expect(result).toEqual({ branchId: 1, rooms: [], events: [] });
    });

    it('defaults to week view when not specified', async () => {
      roomModel.findRoomSchedule.mockResolvedValueOnce({ rooms: [], events: [] });

      await getRoomSchedule(2, '2026-07-30', null);

      expect(roomModel.findRoomSchedule).toHaveBeenCalledWith(2, '2026-07-27', '2026-08-02');
    });
  });

  describe('getReservationDetail', () => {
    it('returns the full reservation detail for a branch reservation', async () => {
      roomModel.findReservationDetail.mockResolvedValueOnce({
        reserveId: 'r1',
        status: 'used',
        date: '2026-08-01',
        startTime: '09:30:00',
        endTime: '11:30:00',
        checkinTime: '2026-08-01T09:31:00.000Z',
        checkoutTime: null,
        room: { roomId: 2, roomName: 'Room A1', location: '3rd Floor, North Wing', capacity: 6, imgUrl: null },
        user: { userId: 'u1', username: 'minhng', email: 'm@example.com', phoneNumber: '0123456789' },
        branchId: 1,
      });

      const result = await getReservationDetail('r1', 1);

      expect(roomModel.findReservationDetail).toHaveBeenCalledWith('r1', 1);
      expect(result.reserveId).toBe('r1');
      expect(result.room.roomName).toBe('Room A1');
      expect(result.user.username).toBe('minhng');
      expect(result.branchId).toBe(1);
    });

    it('returns NOT_FOUND when the reservation does not exist', async () => {
      roomModel.findReservationDetail.mockResolvedValueOnce(null);

      const result = await getReservationDetail('missing', 1);

      expect(roomModel.findReservationDetail).toHaveBeenCalledWith('missing', 1);
      expect(result.error.code).toBe('NOT_FOUND');
      expect(result.statusCode).toBe(404);
    });

    it('returns WRONG_BRANCH when the reservation belongs to another branch', async () => {
      roomModel.findReservationDetail.mockResolvedValueOnce({
        reserveId: 'r2',
        status: 'reserved',
        branchId: 2,
      });

      const result = await getReservationDetail('r2', 1);

      expect(roomModel.findReservationDetail).toHaveBeenCalledWith('r2', 1);
      expect(result.error.code).toBe('WRONG_BRANCH');
      expect(result.statusCode).toBe(403);
    });
  });
});
