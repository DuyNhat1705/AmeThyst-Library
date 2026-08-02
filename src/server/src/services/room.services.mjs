import * as roomModel from '../models/room.models.mjs';

export const getStudyGroupFilterOptions = async () => {
  const rows = await roomModel.findStudyGroupFilterOptions();
  const branches = new Map();
  for (const row of rows) {
    if (!branches.has(row.branchId)) branches.set(row.branchId, { branchId: row.branchId, branchName: row.branchName, rooms: [] });
    branches.get(row.branchId).rooms.push({ roomId: row.roomId, roomName: row.roomName, capacity: row.capacity });
  }
  return [...branches.values()];
};

/**
 * Service to fetch details of a study room by name and branch.
 * @param {string} name 
 * @param {number} branchId 
 * @returns {Promise<Object>}
 */
export const getRoomDetails = async (identifier, branchId) => {
  if (!identifier) {
    throw new Error('Missing room name or ID');
  }
  
  let room;
  const parsedId = parseInt(identifier);
  if (!isNaN(parsedId) && String(parsedId) === String(identifier).trim()) {
    room = await roomModel.findRoomById(parsedId);
  } else {
    if (!branchId) {
      throw new Error('Missing branch ID for name-based lookup');
    }
    room = await roomModel.findRoomByNameAndBranch(identifier, parseInt(branchId));
  }

  if (!room) {
    const error = new Error('Room not found.');
    error.status = 404;
    throw error;
  }
  return room;
};

/**
 * Service to fetch availability slots and calculate booking status.
 * @param {number} roomId 
 * @param {string} date 
 * @returns {Promise<Array>}
 */
export const getRoomAvailability = async (roomId, date) => {
  if (!roomId || !date) {
    throw new Error('Invalid roomId or date parameter format.');
  }

  // Basic format check for YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    const error = new Error('Invalid roomId or date parameter format.');
    error.status = 400;
    throw error;
  }

  const parsedRoomId = parseInt(roomId);
  if (isNaN(parsedRoomId)) {
    const error = new Error('Invalid roomId or date parameter format.');
    error.status = 400;
    throw error;
  }

  const rows = await roomModel.findRoomAvailability(parsedRoomId, date);
  
  return rows.map(row => {
    let status = 'free';
    if (row.reserveId) {
      if (row.reserveStatus === 'pending') {
        status = 'pending';
      } else {
        status = 'reserved';
      }
    }
    
    return {
      availId: row.availId,
      startTime: row.startTime,
      endTime: row.endTime,
      status: status,
      reserveId: row.reserveId || null
    };
  });
};

/**
 * Creates a room reservation after checking for conflicts.
 * @param {string} userId UUID
 * @param {number} availId
 * @param {string} startDate (YYYY-MM-DD)
 * @returns {Promise<Object>}
 */
export const createReservation = async (userId, availId, startDate) => {
  if (!userId || !availId || !startDate) {
    const error = new Error('Missing required fields: userId, availId, startDate');
    error.status = 400;
    throw error;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate)) {
    const error = new Error('Invalid date format. Expected YYYY-MM-DD.');
    error.status = 400;
    throw error;
  }

  const existing = await roomModel.findReservationBySlotAndDate(availId, startDate);
  if (existing) {
    const error = new Error('This time slot is no longer available.');
    error.status = 409;
    throw error;
  }

  try {
    return await roomModel.createReservation(userId, availId, startDate);
  } catch (error) {
    if (error.code === '23505' && error.constraint === 'uq_reserve_room_active_slot') {
      const conflict = new Error('This time slot is no longer available.');
      conflict.status = 409;
      throw conflict;
    }
    if (error.code === '23503' && error.constraint === 'fk_reserve_user') {
      const staleAccount = new Error('Your account is no longer available. Please sign in again.');
      staleAccount.status = 401;
      staleAccount.code = 'AUTH_USER_NOT_FOUND';
      throw staleAccount;
    }
    if (error.code === '23503' && error.constraint === 'fk_reserve_availroom') {
      const missingSlot = new Error('Room availability slot not found.');
      missingSlot.status = 404;
      throw missingSlot;
    }
    throw error;
  }
};

/**
 * Retrieves and categorizes reservations for a user.
 * @param {string} userId UUID
 * @returns {Promise<{upcoming: Array, past: Array}>}
 */
export const getUserReservations = async (userId) => {
  if (!userId) {
    const error = new Error('User ID is required');
    error.status = 400;
    throw error;
  }

  const rows = await roomModel.findUserReservations(userId);
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const toDateStr = (d) => {
    if (typeof d === 'string') return d;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const upcoming = rows.filter(r => toDateStr(r.startDate) >= today);
  const past = rows.filter(r => toDateStr(r.startDate) < today);

  return { upcoming, past };
};

/**
 * Cancels a reservation by permanently deleting it and releasing the active slot.
 * @param {string} reserveId
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
export const cancelReservation = async (reserveId, userId) => {
  if (!reserveId || !userId) {
    const error = new Error('Missing required fields');
    error.status = 400;
    throw error;
  }

  const cancelled = await roomModel.cancelReservation(reserveId, userId);
  if (!cancelled) {
    const error = new Error('Reservation not found or no longer cancellable');
    error.status = 404;
    throw error;
  }

  return true;
};
