import pool from '../config/postgres.mjs';

/**
 * Retrieves a study room record by its name and branch ID.
 * @param {string} name 
 * @param {number} branchId 
 * @returns {Promise<Object|null>}
 */
export const findRoomByNameAndBranch = async (name, branchId) => {
  const query = `
    SELECT 
      room_id AS "roomId",
      branch_id AS "branchId",
      room_name AS "roomName",
      tv_num AS "tvNum",
      board_num AS "boardNum",
      socket_num AS "socketNum",
      projector_num AS "projectorNum",
      img_url AS "imgUrl",
      capacity,
      description
    FROM study_room
    WHERE room_name = $1 AND branch_id = $2
  `;
  const result = await pool.query(query, [name, branchId]);
  return result.rows[0] || null;
};

/**
 * Retrieves a study room record by its ID.
 * @param {number} roomId
 * @returns {Promise<Object|null>}
 */
export const findRoomById = async (roomId) => {
  const query = `
    SELECT 
      room_id AS "roomId",
      branch_id AS "branchId",
      room_name AS "roomName",
      tv_num AS "tvNum",
      board_num AS "boardNum",
      socket_num AS "socketNum",
      projector_num AS "projectorNum",
      img_url AS "imgUrl",
      capacity,
      description
    FROM study_room
    WHERE room_id = $1
  `;
  const result = await pool.query(query, [roomId]);
  return result.rows[0] || null;
};

/**
 * Retrieves availability slots for a specific room on a given date, joined with bookings.
 * @param {number} roomId 
 * @param {string} date (YYYY-MM-DD)
 * @returns {Promise<Array>}
 */
export const findRoomAvailability = async (roomId, date) => {
  const query = `
    SELECT 
      ra.avail_id AS "availId",
      ra.start_time AS "startTime",
      ra.end_time AS "endTime",
      rr.reserve_id AS "reserveId",
      rr.status AS "reserveStatus"
    FROM room_avail ra
    LEFT JOIN reserve_room rr ON ra.avail_id = rr.avail_id AND rr.start_date = $2 AND rr.status IN ('reserved', 'pending', 'used')
    WHERE ra.room_id = $1
    ORDER BY ra.start_time ASC
  `;
  const result = await pool.query(query, [roomId, date]);
  return result.rows;
};

/**
 * Checks if a reservation already exists for a given slot and date.
 * @param {number} availId
 * @param {string} date (YYYY-MM-DD)
 * @returns {Promise<Object|null>}
 */
export const findReservationBySlotAndDate = async (availId, date) => {
  const query = `
    SELECT reserve_id AS "reserveId"
    FROM reserve_room
    WHERE avail_id = $1 AND start_date = $2
      AND status IN ('reserved', 'pending')
    LIMIT 1
  `;
  const result = await pool.query(query, [availId, date]);
  return result.rows[0] || null;
};

/**
 * Creates a new room reservation.
 * @param {number} userId
 * @param {number} availId
 * @param {string} startDate (YYYY-MM-DD)
 * @returns {Promise<Object>}
 */
export const createReservation = async (userId, availId, startDate) => {
  const query = `
    INSERT INTO reserve_room (user_id, avail_id, start_date, status)
    VALUES ($1, $2, $3, 'reserved')
    RETURNING 
      reserve_id AS "reserveId",
      avail_id AS "availId",
      start_date AS "startDate",
      status
  `;
  const result = await pool.query(query, [userId, availId, startDate]);
  return result.rows[0];
};

/**
 * Retrieves all reservations for a user, joined with room_avail and study_room.
 * @param {number} userId
 * @returns {Promise<Array>}
 */
export const findUserReservations = async (userId) => {
  const query = `
    SELECT 
      rr.reserve_id AS "reserveId",
      rr.start_date AS "startDate",
      ra.start_time AS "startTime",
      ra.end_time AS "endTime",
      rr.status,
      sr.room_name AS "roomName",
      sr.img_url AS "imgUrl",
      sr.description,
      sr.capacity,
      sr.room_id AS "roomId"
    FROM reserve_room rr
    JOIN room_avail ra ON rr.avail_id = ra.avail_id
    JOIN study_room sr ON ra.room_id = sr.room_id
    WHERE rr.user_id = $1
    ORDER BY rr.start_date DESC, ra.start_time ASC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

/**
 * Deletes a reservation by reserve_id, scoped to a user.
 * @param {string} reserveId
 * @param {string} userId
 * @returns {Promise<boolean>} true if a row was deleted
 */
export const deleteReservation = async (reserveId, userId) => {
  const query = `
    DELETE FROM reserve_room
    WHERE reserve_id = $1 AND user_id = $2
  `;
  const result = await pool.query(query, [reserveId, userId]);
  return result.rowCount > 0;
};
