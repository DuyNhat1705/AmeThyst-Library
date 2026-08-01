import pool from '../config/postgres.mjs';

// Reservation dates (start_date) and slot times (start_time/end_time) are
// stored without timezone and represent Vietnam local time. Recorded instants
// (checkin_time, expired_at, checkout_time) are stored in UTC (DB session tz).
const VIETNAM_NOW_SQL = `(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')`;
const UTC_ISO_SQL = (value) => `to_char(${value}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`;

export const findStudyGroupFilterOptions = async () => {
  const result = await pool.query(`
    SELECT b.branch_id AS "branchId", b.name AS "branchName",
      sr.room_id AS "roomId", sr.room_name AS "roomName", sr.capacity
    FROM public.branches b
    JOIN public.study_room sr ON sr.branch_id = b.branch_id
    WHERE sr.capacity >= 1
    ORDER BY b.branch_id ASC, sr.room_name ASC, sr.room_id ASC
  `);
  return result.rows;
};

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
 * @param {Object} [client=pool]
 * @returns {Promise<Object>}
 */
export const createReservation = async (userId, availId, startDate, client = pool) => {
  const query = `
    INSERT INTO reserve_room (user_id, avail_id, start_date, status)
    VALUES ($1, $2, $3, 'reserved')
    RETURNING 
      reserve_id AS "reserveId",
      avail_id AS "availId",
      start_date AS "startDate",
      status
  `;
  const result = await client.query(query, [userId, availId, startDate]);
  return result.rows[0];
};

/**
 * Reads the user's active room reservation counter.
 * @param {string} userId
 * @param {Object} [client=pool]
 * @returns {Promise<number>}
 */
export const findUserReserveNum = async (userId, client = pool) => {
  const result = await client.query(
    'SELECT reserve_num FROM public.users WHERE user_id = $1',
    [userId]
  );
  return result.rows.length > 0 ? (result.rows[0].reserve_num || 0) : 0;
};

/**
 * Increments the user's active room reservation counter only if it is below
 * `max`, enforcing the per-user limit atomically against concurrent requests.
 * @param {string} userId
 * @param {number} max
 * @param {Object} [client=pool]
 * @returns {Promise<boolean>} true if the counter was incremented
 */
export const incrementReserveNum = async (userId, max, client = pool) => {
  const result = await client.query(
    'UPDATE public.users SET reserve_num = reserve_num + 1 WHERE user_id = $1 AND reserve_num < $2',
    [userId, max]
  );
  return result.rowCount > 0;
};

/**
 * Decrements the user's active room reservation counter (floor 0).
 * @param {string} userId
 * @param {Object} [client=pool]
 */
export const decrementReserveNum = async (userId, client = pool) => {
  await client.query(
    'UPDATE public.users SET reserve_num = GREATEST(reserve_num - 1, 0) WHERE user_id = $1',
    [userId]
  );
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
      rr.pin,
      ${UTC_ISO_SQL('rr.expired_at')} AS "expiresAt",
      ${UTC_ISO_SQL('rr.checkin_time')} AS "checkinTime",
      ${UTC_ISO_SQL('rt.checkout_time')} AS "checkoutTime",
      sr.room_name AS "roomName",
      sr.img_url AS "imgUrl",
      sr.description,
      sr.capacity,
      sr.room_id AS "roomId",
      sr.branch_id AS "branchId",
      br.name AS "branchName"
    FROM reserve_room rr
    JOIN room_avail ra ON rr.avail_id = ra.avail_id
    JOIN study_room sr ON ra.room_id = sr.room_id
    JOIN public.branches br ON sr.branch_id = br.branch_id
    LEFT JOIN public.return_room rt ON rt.reserve_id = rr.reserve_id
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
export const cancelReservation = async (reserveId, userId, client = pool) => {
  const query = `
    DELETE FROM reserve_room
    WHERE reserve_id = $1 AND user_id = $2
      AND status IN ('pending', 'reserved')
    RETURNING reserve_id AS "reserveId"
  `;
  const result = await client.query(query, [reserveId, userId]);
  return result.rowCount > 0;
};

export const deleteReservation = cancelReservation;

/**
 * Fetches a user's room reservation history with optional inclusive date-range
 * filtering on start_date, exposing check-in/check-out times via return_room.
 * @param {string} userId
 * @param {string} [from] YYYY-MM-DD
 * @param {string} [to] YYYY-MM-DD
 * @returns {Promise<Array>}
 */
export const findRoomHistory = async (userId, from, to) => {
  let query = `
    SELECT
      rr.reserve_id AS "reserveId",
      rr.start_date AS "startDate",
      ra.start_time AS "startTime",
      ra.end_time AS "endTime",
      rr.status,
      ${UTC_ISO_SQL('rr.checkin_time')} AS "checkinTime",
      ${UTC_ISO_SQL('rt.checkout_time')} AS "checkoutTime",
      sr.room_name AS "roomName",
      sr.img_url AS "imgUrl",
      sr.capacity,
      sr.room_id AS "roomId",
      sr.branch_id AS "branchId",
      br.name AS "branchName"
    FROM reserve_room rr
    JOIN room_avail ra ON rr.avail_id = ra.avail_id
    JOIN study_room sr ON ra.room_id = sr.room_id
    JOIN public.branches br ON sr.branch_id = br.branch_id
    LEFT JOIN public.return_room rt ON rt.reserve_id = rr.reserve_id
    WHERE rr.user_id = $1
  `;
  const params = [userId];

  if (from) {
    params.push(from);
    query += ` AND rr.start_date >= $${params.length}::date`;
  }
  if (to) {
    params.push(to);
    query += ` AND rr.start_date <= $${params.length}::date`;
  }

  query += ` ORDER BY rr.start_date DESC, ra.start_time ASC`;

  const result = await pool.query(query, params);
  return result.rows;
};

/**
 * Fetches a reservation owned by a user, joining room_avail for slot times.
 * @param {string} reserveId
 * @param {string} userId
 * @param {Object} [client=pool]
 * @returns {Promise<Object|null>} { reserveId, userId, status, startDate, endTime }
 */
export const findReservationOwnedBy = async (reserveId, userId, client = pool) => {
  const query = `
    SELECT
      rr.reserve_id AS "reserveId",
      rr.user_id AS "userId",
      rr.status,
      rr.start_date AS "startDate",
      ra.end_time AS "endTime"
    FROM reserve_room rr
    JOIN room_avail ra ON rr.avail_id = ra.avail_id
    WHERE rr.reserve_id = $1 AND rr.user_id = $2
  `;
  const result = await client.query(query, [reserveId, userId]);
  return result.rows[0] || null;
};

/**
 * Fetches an existing return record for a reservation.
 * @param {string} reserveId
 * @param {Object} [client=pool]
 * @returns {Promise<Object|null>} { return_id, checkout_time }
 */
export const findReturnRecord = async (reserveId, client = pool) => {
  const query = `
    SELECT return_id AS "returnId", ${UTC_ISO_SQL('checkout_time')} AS "checkoutTime"
    FROM public.return_room
    WHERE reserve_id = $1
  `;
  const result = await client.query(query, [reserveId]);
  return result.rows[0] || null;
};

/**
 * Inserts a return_room record for a used reservation (idempotent) and
 * decrements the user's reserve_num. Must run inside a transaction.
 * @param {string} reserveId
 * @param {string} userId
 * @param {string} [checkoutTime] Override checkout time (for backfill)
 * @param {Object} client
 * @returns {Promise<{inserted: boolean, returnId: string|null, checkoutTime: string|null}>}
 */
export const checkoutRoom = async (reserveId, userId, checkoutTime, client) => {
  const insertQuery = checkoutTime
    ? `INSERT INTO public.return_room (reserve_id, checkout_time) VALUES ($1, $2) ON CONFLICT DO NOTHING`
    : `INSERT INTO public.return_room (reserve_id) VALUES ($1) ON CONFLICT DO NOTHING`;

  const existing = await findReturnRecord(reserveId, client);
  if (existing) {
    return { inserted: false, returnId: existing.returnId, checkoutTime: existing.checkoutTime };
  }

  await client.query(insertQuery, checkoutTime ? [reserveId, checkoutTime] : [reserveId]);

  await client.query(
    `UPDATE public.users SET reserve_num = GREATEST(reserve_num - 1, 0) WHERE user_id = $1`,
    [userId]
  );

  const inserted = await findReturnRecord(reserveId, client);
  return { inserted: true, returnId: inserted.returnId, checkoutTime: inserted.checkoutTime };
};

/**
 * Backfills checkout records for `used` reservations whose slot has elapsed
 * but have no return_room row, using the slot end time as checkout time.
 * @returns {Promise<number>} number of backfilled reservations
 */
export const backfillDefaultedCheckouts = async () => {
  const query = `
    INSERT INTO public.return_room (reserve_id, checkout_time)
    SELECT rr.reserve_id,
      ((rr.start_date::timestamp + ra.end_time) AT TIME ZONE 'Asia/Ho_Chi_Minh') AS checkout_time
    FROM reserve_room rr
    JOIN room_avail ra ON rr.avail_id = ra.avail_id
    WHERE rr.status = 'used'
      AND rr.checkin_time IS NOT NULL
      AND (rr.start_date::timestamp + ra.end_time + interval '15 minutes') < ${VIETNAM_NOW_SQL}
      AND NOT EXISTS (SELECT 1 FROM public.return_room rt WHERE rt.reserve_id = rr.reserve_id)
    RETURNING reserve_id
  `;
  const result = await pool.query(query);
  const backfilled = result.rows.length;

  if (backfilled > 0) {
    const ids = result.rows.map((r) => r.reserve_id);
    await pool.query(
      `UPDATE public.users SET reserve_num = GREATEST(reserve_num - 1, 0)
       WHERE user_id IN (
         SELECT rr.user_id FROM reserve_room rr WHERE rr.reserve_id = ANY($1::uuid[])
       )`,
      [ids]
    );
  }

  return backfilled;
};

/**
 * Finds a pending room reservation by its PIN, joining user, room, and branch details.
 * @param {string} pin
 * @returns {Promise<Object|null>}
 */
export const findPendingRoomReservationByPin = async (pin) => {
  const query = `
    SELECT
      rr.reserve_id AS "reserveId",
      rr.user_id AS "userId",
      rr.avail_id AS "availId",
      rr.start_date AS "startDate",
      ra.start_time AS "startTime",
      ra.end_time AS "endTime",
      u.username,
      u.gender,
      u.phone_number AS "phoneNumber",
      u.email,
      u.avatar,
      sr.room_name AS "roomName",
      sr.description,
      sr.capacity,
      sr.img_url AS "imgUrl",
      br.branch_id AS "branchId",
      br.name AS "branchName",
      br.address AS "branchAddress"
    FROM reserve_room rr
    JOIN public.users u ON rr.user_id = u.user_id
    JOIN room_avail ra ON rr.avail_id = ra.avail_id
    JOIN study_room sr ON ra.room_id = sr.room_id
    JOIN public.branches br ON sr.branch_id = br.branch_id
    WHERE rr.pin = $1 AND rr.status = 'pending' AND rr.expired_at > NOW()
  `;
  const result = await pool.query(query, [pin]);
  return result.rows[0] || null;
};

/**
 * Fetches the branch id a reservation's room belongs to.
 * @param {string} reserveId
 * @param {Object} [client=pool]
 * @returns {Promise<{branchId: number}|null>}
 */
export const findReservationBranch = async (reserveId, client = pool) => {
  const result = await client.query(
    `SELECT br.branch_id AS "branchId"
     FROM reserve_room rr
     JOIN room_avail ra ON rr.avail_id = ra.avail_id
     JOIN study_room sr ON ra.room_id = sr.room_id
     JOIN public.branches br ON sr.branch_id = br.branch_id
     WHERE rr.reserve_id = $1`,
    [reserveId]
  );
  return result.rows[0] || null;
};

/**
 * Confirms a room check-in: marks the reservation as 'used', clears the PIN,
 * and records the check-in time. Guards on ownership and status.
 * @param {string} reserveId
 * @param {Object} client
 * @returns {Promise<boolean>} true if the reservation was transitioned
 */
export const confirmRoomCheckin = async (reserveId, client = pool) => {
  const query = `
    UPDATE reserve_room
    SET status = 'used', checkin_time = NOW(), pin = NULL, expired_at = NULL
    WHERE reserve_id = $1 AND status = 'pending'
  `;
  const result = await client.query(query, [reserveId]);
  return result.rowCount > 0;
};

/**
 * Manually clears a pending PIN back to 'reserved' (user dismisses PIN flow).
 * @param {string} reserveId
 * @param {string} userId
 * @returns {Promise<boolean>} true if a pending PIN row was cleared
 */
export const cleanupRoomPin = async (reserveId, userId) => {
  const result = await pool.query(
    `UPDATE reserve_room SET pin = NULL, expired_at = NULL, status = 'reserved'
     WHERE reserve_id = $1 AND user_id = $2 AND status = 'pending'`,
    [reserveId, userId]
  );
  return result.rowCount > 0;
};
