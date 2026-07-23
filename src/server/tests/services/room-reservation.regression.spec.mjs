import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/models/room.models.mjs', () => ({
  findReservationBySlotAndDate: vi.fn(),
  createReservation: vi.fn(),
  cancelReservation: vi.fn(),
  findRoomAvailability: vi.fn(),
  findUserReservations: vi.fn(),
  findRoomById: vi.fn(),
  findRoomByNameAndBranch: vi.fn(),
}));

import * as roomModel from '../../src/models/room.models.mjs';
import { cancelReservation, createReservation, getRoomAvailability } from '../../src/services/room.services.mjs';

describe('room reservation deletion cancellation regression', () => {
  beforeEach(() => vi.clearAllMocks());

  it('cancels through the deletion-based model contract', async () => {
    roomModel.cancelReservation.mockResolvedValue(true);
    await expect(cancelReservation('reserve-id', 'user-id')).resolves.toBe(true);
    expect(roomModel.cancelReservation).toHaveBeenCalledWith('reserve-id', 'user-id');
  });

  it('preserves freely-mode conflict behavior', async () => {
    roomModel.findReservationBySlotAndDate.mockResolvedValue({ reserveId: 'taken' });
    await expect(createReservation('user-id', 1, '2030-01-10')).rejects.toMatchObject({ status: 409 });
    expect(roomModel.createReservation).not.toHaveBeenCalled();
  });

  it('maps a concurrent active-slot uniqueness conflict to HTTP 409', async () => {
    roomModel.findReservationBySlotAndDate.mockResolvedValue(null);
    roomModel.createReservation.mockRejectedValue({ code: '23505', constraint: 'uq_reserve_room_active_slot' });
    await expect(createReservation('user-id', 1, '2030-01-10')).rejects.toMatchObject({ status: 409, message: 'This time slot is no longer available.' });
  });

  it('maps a stale authenticated user foreign key to a re-login response', async () => {
    roomModel.findReservationBySlotAndDate.mockResolvedValue(null);
    roomModel.createReservation.mockRejectedValue({ code: '23503', constraint: 'fk_reserve_user' });
    await expect(createReservation('stale-user-id', 1, '2030-01-10')).rejects.toMatchObject({ status: 401, code: 'AUTH_USER_NOT_FOUND' });
  });

  it('maps only active joined reservations to unavailable slots', async () => {
    roomModel.findRoomAvailability.mockResolvedValue([{ availId: 1, reserveId: null, reserveStatus: null }]);
    await expect(getRoomAvailability(1, '2030-01-10')).resolves.toEqual([{ availId: 1, startTime: undefined, endTime: undefined, status: 'free', reserveId: null }]);
  });
});
