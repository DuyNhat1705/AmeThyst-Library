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
