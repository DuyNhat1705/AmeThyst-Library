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
