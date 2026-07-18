import * as roomModel from '../models/room.models.mjs';

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
 * @param {number} userId
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

  const reservation = await roomModel.createReservation(userId, availId, startDate);
  return reservation;
};

/**
 * Retrieves and categorizes reservations for a user.
 * @param {number} userId
 * @returns {Promise<{upcoming: Array, past: Array}>}
 */
export const getUserReservations = async (userId) => {
  if (!userId) {
    const error = new Error('User ID is required');
    error.status = 400;
    throw error;
  }

  const rows = await roomModel.findUserReservations(userId);
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = rows.filter(r => {
    const d = typeof r.startDate === 'string' ? r.startDate : r.startDate.toISOString().slice(0, 10);
    return d >= today;
  });
  const past = rows.filter(r => {
    const d = typeof r.startDate === 'string' ? r.startDate : r.startDate.toISOString().slice(0, 10);
    return d < today;
  });

  return { upcoming, past };
};

/**
 * Cancels a reservation by deleting the row.
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

  const deleted = await roomModel.deleteReservation(reserveId, userId);
  if (!deleted) {
    const error = new Error('Reservation not found or already cancelled');
    error.status = 404;
    throw error;
  }

  return true;
};
