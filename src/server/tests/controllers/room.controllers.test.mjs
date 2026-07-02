import { jest } from '@jest/globals';

// 1. Mock the internal room services module
jest.unstable_mockModule('../../src/services/room.services.mjs', () => ({
  getRoomDetails: jest.fn(),
  getRoomAvailability: jest.fn(),
}));

// 2. Dynamically import mock functions
const { getRoomDetails, getRoomAvailability } = await import('../../src/services/room.services.mjs');

// 3. Dynamically import the controllers
const { getDetails, getAvailability } = await import('../../src/controllers/room.controllers.mjs');

describe('Room Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('getDetails', () => {
    it('should return 400 if room name is missing', async () => {
      mockReq = { query: { branchId: '1' } };

      await getDetails(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Room name is required.' });
    });

    it('should return 400 if branchId is missing', async () => {
      mockReq = { query: { name: 'meetingRoom1' } };

      await getDetails(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Branch ID is required.' });
    });

    it('should return 200 and room details on success', async () => {
      mockReq = { query: { name: 'meetingRoom1', branchId: '1' } };
      const mockData = {
        roomId: 1,
        roomName: 'meetingRoom1',
        capacity: 8,
        description: 'Room description'
      };
      getRoomDetails.mockResolvedValue(mockData);

      await getDetails(mockReq, mockRes);

      expect(getRoomDetails).toHaveBeenCalledWith('meetingRoom1', 1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: mockData });
    });

    it('should handle service errors correctly', async () => {
      mockReq = { query: { name: 'meetingRoom1', branchId: '1' } };
      const serviceError = new Error('Room not found');
      serviceError.status = 404;
      getRoomDetails.mockRejectedValue(serviceError);

      await getDetails(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Room not found' });
    });
  });

  describe('getAvailability', () => {
    it('should return 400 if roomId is missing', async () => {
      mockReq = { query: { date: '2026-07-02' } };

      await getAvailability(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Room ID is required.' });
    });

    it('should return 400 if date is missing', async () => {
      mockReq = { query: { roomId: '1' } };

      await getAvailability(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Date parameter is required.' });
    });

    it('should return 200 and slots list on success', async () => {
      mockReq = { query: { roomId: '1', date: '2026-07-02' } };
      const mockSlots = [
        { availId: 1, startTime: '08:00:00', endTime: '10:00:00', status: 'free' }
      ];
      getRoomAvailability.mockResolvedValue(mockSlots);

      await getAvailability(mockReq, mockRes);

      expect(getRoomAvailability).toHaveBeenCalledWith(1, '2026-07-02');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: mockSlots });
    });

    it('should handle controller/service failures', async () => {
      mockReq = { query: { roomId: '1', date: '2026-07-02' } };
      const serviceError = new Error('Database error');
      getRoomAvailability.mockRejectedValue(serviceError);

      await getAvailability(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });
});
