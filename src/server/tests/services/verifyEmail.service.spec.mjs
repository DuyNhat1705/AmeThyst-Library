import { vi, describe, it, expect, beforeEach } from 'vitest';
import {
  findUserByEmail,
  getPendingByToken,
  deletePendingByToken,
  insertUserFromPending,
} from '../../src/models/auth.models.mjs';
import {
  withTransaction,
  signToken,
  buildUserPayload,
} from '../../src/utils/authHelpers.mjs';
import { verifyEmail } from '../../src/services/auth.services.mjs';

vi.mock('../../src/models/auth.models.mjs', () => ({
  findUserByEmail: vi.fn(),
  getPendingByToken: vi.fn(),
  deletePendingByToken: vi.fn(),
  insertUserFromPending: vi.fn(),
  getPendingByEmail: vi.fn(),
  deletePendingByEmail: vi.fn(),
}));

vi.mock('../../src/utils/authHelpers.mjs', () => ({
  withTransaction: vi.fn(),
  signToken: vi.fn(),
  buildUserPayload: vi.fn(),
}));

describe('Verify Email Service', () => {
  const mockToken = 'mock-uuid-token-54321';
  const mockPendingRow = {
    token: mockToken,
    email: 'verify@example.com',
    password_hash: 'hashed_password',
    username: 'verify_user',
    role: 'user',
    expired_at: new Date(Date.now() + 60000).toISOString(), // 1 minute in the future
  };

  const mockUserRow = {
    user_id: 42,
    email: 'verify@example.com',
    username: 'verify_user',
    password_hash: 'hashed_password',
    avatar: null,
    role: 'user',
  };

  const mockMappedUser = {
    userId: 42,
    email: 'verify@example.com',
    username: 'verify_user',
    avatar: null,
    role: 'user',
    branch_id: null,
  };

  const arrangeHappyPath = () => {
    getPendingByToken.mockResolvedValue(mockPendingRow);
    findUserByEmail.mockResolvedValue(null);
    withTransaction.mockImplementation(async (callback) => callback({}));
    insertUserFromPending.mockResolvedValue(mockUserRow);
    deletePendingByToken.mockResolvedValue(undefined);
    signToken.mockReturnValue('jwt-token-xyz');
    buildUserPayload.mockReturnValue(mockMappedUser);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test 1 - Successful end-to-end email verification', { tags: '@A_R1' }, () => {
    it('[TC-SRV-VE-001] should promote the pending user to the users table, delete the pending token, and return JWT + user', async () => {
      arrangeHappyPath();

      const result = await verifyEmail({ token: mockToken });

      expect(getPendingByToken).toHaveBeenCalledWith(mockToken);
      expect(findUserByEmail).toHaveBeenCalledWith(mockPendingRow.email);
      expect(withTransaction).toHaveBeenCalled();
      expect(insertUserFromPending).toHaveBeenCalledWith(
        {
          email: mockPendingRow.email,
          passwordHash: mockPendingRow.password_hash,
          username: mockPendingRow.username,
        },
        expect.any(Object)
      );
      expect(deletePendingByToken).toHaveBeenCalledWith(mockToken, expect.any(Object));
      expect(signToken).toHaveBeenCalledWith(
        mockUserRow.user_id,
        mockUserRow.email,
        mockUserRow.role,
        mockUserRow.branch_id
      );
      expect(buildUserPayload).toHaveBeenCalledWith(mockUserRow);

      expect(result).toEqual({
        token: 'jwt-token-xyz',
        user: mockMappedUser,
      });
    });
  });

  describe('Test 2 - Reject duplicate email during verification', { tags: '@A_R2' }, () => {
    it('[TC-SRV-VE-002] should delete the pending token and throw an error if the email was registered in the meantime', async () => {
      arrangeHappyPath();
      findUserByEmail.mockResolvedValue({ user_id: 101, email: mockPendingRow.email });

      await expect(verifyEmail({ token: mockToken })).rejects.toThrow('Email already exists.');

      expect(deletePendingByToken).toHaveBeenCalledWith(mockToken);
      expect(insertUserFromPending).not.toHaveBeenCalled();
    });
  });

  describe('Test 3 - TTL and token validation lifecycle', { tags: '@A_R3' }, () => {
    it('[TC-SRV-VE-003] should reject and throw error for non-existent token', async () => {
      arrangeHappyPath();
      getPendingByToken.mockResolvedValue(null);

      await expect(verifyEmail({ token: 'unknown-token' })).rejects.toThrow(
        'Invalid or expired verification link.'
      );
      expect(deletePendingByToken).not.toHaveBeenCalled();
      expect(insertUserFromPending).not.toHaveBeenCalled();
    });

    it('[TC-SRV-VE-004] should delete token and throw error if the token has expired', async () => {
      arrangeHappyPath();
      getPendingByToken.mockResolvedValue({
        ...mockPendingRow,
        expired_at: new Date(Date.now() - 1000).toISOString(), // Expired 1s ago
      });

      await expect(verifyEmail({ token: mockToken })).rejects.toThrow(
        'Verification link has expired. Please register again.'
      );
      expect(deletePendingByToken).toHaveBeenCalledWith(mockToken);
      expect(insertUserFromPending).not.toHaveBeenCalled();
    });

    it('[TC-SRV-VE-005] should verify successfully on the exact expiration boundary', async () => {
      const now = new Date();
      vi.useFakeTimers();
      vi.setSystemTime(now);

      try {
        arrangeHappyPath();
        getPendingByToken.mockResolvedValue({
          ...mockPendingRow,
          expired_at: now.toISOString(), // Expires exactly now
        });

        const result = await verifyEmail({ token: mockToken });
        expect(result).toEqual({
          token: 'jwt-token-xyz',
          user: mockMappedUser,
        });
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('Test 4 - Security and data-shape invariants', { tags: '@A_R7' }, () => {
    it('[TC-SRV-VE-006] should strictly return mapped payload without password hash', async () => {
      arrangeHappyPath();

      const result = await verifyEmail({ token: mockToken });
      expect(result.user).not.toHaveProperty('password_hash');
      expect(result.user.role).toBe('user');
    });
  });

  describe('Test 5 - Infrastructure failure handling', { tags: '@A_R8' }, () => {
    it('[TC-SRV-VE-007] should propagate database check failures safely', async () => {
      arrangeHappyPath();
      getPendingByToken.mockRejectedValue(new Error('Postgres pool connection lost'));

      await expect(verifyEmail({ token: mockToken })).rejects.toThrow(
        'Postgres pool connection lost'
      );
    });
  });

  describe('Test 6 - Transactional consistency', { tags: '@A_R9' }, () => {
    it('[TC-SRV-VE-008] should roll back if database transaction fails midway', async () => {
      arrangeHappyPath();
      withTransaction.mockRejectedValue(new Error('Transaction rolled back: Insert user failed'));

      await expect(verifyEmail({ token: mockToken })).rejects.toThrow(
        'Transaction rolled back: Insert user failed'
      );
    });
  });
});
