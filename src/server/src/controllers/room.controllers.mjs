import * as roomService from '../services/room.services.mjs';

/**
 * Controller to get room details.
 */
export const getRoomDetailsController = async (req, res) => {
  try {
    const { name, roomId, branchId } = req.query;
    const identifier = roomId || name;
    if (!identifier) {
      return res.status(400).json({
        success: false,
        error: 'Room identifier (roomId or name) is required.'
      });
    }

    const room = await roomService.getRoomDetails(identifier, branchId);
    return res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'An error occurred while fetching room details.'
    });
  }
};

/**
 * Controller to get room availability slots.
 */
export const getRoomAvailabilityController = async (req, res) => {
  try {
    const { roomId, date } = req.query;
    if (!roomId || !date) {
      return res.status(400).json({
        success: false,
        error: 'Invalid roomId or date parameter format.'
      });
    }

    const availability = await roomService.getRoomAvailability(roomId, date);
    return res.status(200).json({
      success: true,
      data: availability
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'An error occurred while fetching availability.'
    });
  }
};

/**
 * Controller to create a room reservation.
 */
export const createReservationController = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Authentication required.' });
    }

    const { availId, startDate } = req.body;
    if (!availId || !startDate) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: availId, startDate.'
      });
    }

    const reservation = await roomService.createReservation(userId, availId, startDate);
    return res.status(201).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'An error occurred while creating reservation.'
    });
  }
};

/**
 * Controller to get user's room reservations.
 */
export const getUserReservationsController = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Authentication required.' });
    }

    const result = await roomService.getUserReservations(userId);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'An error occurred while fetching reservations.'
    });
  }
};

/**
 * Controller to cancel a room reservation.
 */
export const cancelReservationController = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Authentication required.' });
    }

    const { reserveId } = req.params;
    if (!reserveId) {
      return res.status(400).json({ success: false, error: 'Missing reservation ID.' });
    }

    await roomService.cancelReservation(reserveId, userId);
    return res.status(200).json({ success: true, message: 'Reservation cancelled.' });
  } catch (error) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'An error occurred while cancelling reservation.'
    });
  }
};
