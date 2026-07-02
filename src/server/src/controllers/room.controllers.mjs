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
