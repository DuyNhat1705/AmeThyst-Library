import { generatePickupPin, cleanupReservationPin, cancelReservationById, getUserBorrowRecords } from '../services/dashboard.user.services.mjs';

const generatePin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reservationId } = req.params;

    const result = await generatePickupPin(userId, reservationId);

    if (result.error) {
      return res.status(result.statusCode || 400).json({
        success: false,
        error: result.error
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error generating pickup PIN:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' }
    });
  }
};

const cleanupPin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reservationId } = req.params;
    const cleaned = await cleanupReservationPin(userId, reservationId);
    res.json({ success: true, cleaned });
  } catch (error) {
    console.error('Error cleaning up PIN:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' }
    });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reservationId } = req.params;

    const result = await cancelReservationById(userId, reservationId);
    
    if (result.error) {
      return res.status(result.statusCode || 400).json({ 
        success: false, 
        error: result.error 
      });
    }
    
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ 
      success: false, 
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } 
    });
  }
};

const getMyBorrowRecords = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await getUserBorrowRecords(userId);
    res.json(result);
  } catch (error) {
    console.error('Error fetching borrow records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { generatePin, cleanupPin, cancelReservation, getMyBorrowRecords };
