import { jest } from '@jest/globals';

// 1. Mock the internal room models module
jest.unstable_mockModule('../../src/models/room.models.mjs', () => ({
  findRoomByNameAndBranch: jest.fn(),
  findRoomAvailability: jest.fn(),
}));

// 2. Dynamically import mocked functions
const { findRoomByNameAndBranch, findRoomAvailability } = await import('../../src/models/room.models.mjs');

// 3. Dynamically import the service functions to be tested
const { getRoomDetails, getRoomAvailability } = await import('../../src/services/room.services.mjs');

describe('Room Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRoomDetails', () => {
    it('should return room details if name and branchId are valid and room exists', async () => {
      const mockRoom = {
        roomId: 1,
        branchId: 1,
        roomName: 'meetingRoom1',
        tvNum: 1,
        boardNum: 1,
        socketNum: 4,
        capacity: 8,
        description: 'Large room'
      };
      
      findRoomByNameAndBranch.mockResolvedValue(mockRoom);

      const result = await getRoomDetails('meetingRoom1', 1);

      expect(findRoomByNameAndBranch).toHaveBeenCalledWith('meetingRoom1', 1);
      expect(result).toEqual(mockRoom);
    });

    it('should throw an error with status 404 if room does not exist', async () => {
      findRoomByNameAndBranch.mockResolvedValue(null);

      await expect(getRoomDetails('nonExistentRoom', 1)).rejects.toThrow('Room not found with the specified name.');
      
      try {
        await getRoomDetails('nonExistentRoom', 1);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });

    it('should throw an error if parameters are missing', async () => {
      await expect(getRoomDetails('', 1)).rejects.toThrow('Missing room name or branch ID');
      await expect(getRoomDetails('meetingRoom1', null)).rejects.toThrow('Missing room name or branch ID');
    });
  });

  describe('getRoomAvailability', () => {
    const mockDate = '2026-07-02';
    const mockRoomId = 5;

    it('should return mapped slot availability', async () => {
      const mockRows = [
        { availId: 1, startTime: '08:00:00', endTime: '10:00:00', reserveId: null, reserveStatus: null },
        { availId: 2, startTime: '10:00:00', endTime: '12:00:00', reserveId: 'uuid-1', reserveStatus: 'pending' },
        { availId: 3, startTime: '12:00:00', endTime: '14:00:00', reserveId: 'uuid-2', reserveStatus: 'reserved' },
        { availId: 4, startTime: '14:00:00', endTime: '16:00:00', reserveId: 'uuid-3', reserveStatus: 'used' },
      ];

      findRoomAvailability.mockResolvedValue(mockRows);

      const result = await getRoomAvailability(mockRoomId, mockDate);

      expect(findRoomAvailability).toHaveBeenCalledWith(mockRoomId, mockDate);
      expect(result).toEqual([
        { availId: 1, startTime: '08:00:00', endTime: '10:00:00', status: 'free', reserveId: null },
        { availId: 2, startTime: '10:00:00', endTime: '12:00:00', status: 'pending', reserveId: 'uuid-1' },
        { availId: 3, startTime: '12:00:00', endTime: '14:00:00', status: 'reserved', reserveId: 'uuid-2' },
        { availId: 4, startTime: '14:00:00', endTime: '16:00:00', status: 'reserved', reserveId: 'uuid-3' },
      ]);
    });

    it('should throw an error with status 400 if date format is invalid', async () => {
      await expect(getRoomAvailability(mockRoomId, '2026/07/02')).rejects.toThrow('Invalid roomId or date parameter format.');
      
      try {
        await getRoomAvailability(mockRoomId, '2026/07/02');
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('should throw an error with status 400 if roomId is not a number', async () => {
      await expect(getRoomAvailability('abc', mockDate)).rejects.toThrow('Invalid roomId or date parameter format.');
      
      try {
        await getRoomAvailability('abc', mockDate);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('should throw an error if parameters are missing', async () => {
      await expect(getRoomAvailability(null, mockDate)).rejects.toThrow('Invalid roomId or date parameter format.');
      await expect(getRoomAvailability(mockRoomId, null)).rejects.toThrow('Invalid roomId or date parameter format.');
    });
  });
});
