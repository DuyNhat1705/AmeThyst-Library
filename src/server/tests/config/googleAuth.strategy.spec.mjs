import { vi, describe, it, expect, beforeEach } from 'vitest';
import pool from '../../src/config/postgres.mjs';
import { googleVerifyCallback } from '../../src/config/passport.mjs';

vi.mock('../../src/config/postgres.mjs', () => ({
  default: {
    query: vi.fn(),
  },
}));

describe('Google Strategy Verify Callback', () => {
  const mockProfile = {
    emails: [{ value: 'oauth@example.com' }],
    displayName: 'Google User',
    photos: [{ value: 'https://avatar-url.com/pic.jpg' }],
  };

  const mockDone = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test 1 - Google OAuth first-time sign-in (Auto-provisioning)', { tags: ['@A_R5', '@A_R7'] }, () => {
    it('should query for the email, auto-create the user, and return the user payload', async () => {
      // 1. SELECT query returns 0 rows
      pool.query.mockResolvedValueOnce({ rows: [] });
      // 2. INSERT query returns the new user row
      const mockCreatedUser = {
        user_id: 88,
        email: 'oauth@example.com',
        username: 'Google User',
        avatar: 'https://avatar-url.com/pic.jpg',
        password_hash: 'GOOGLE_AUTH',
        role: 'user',
      };
      pool.query.mockResolvedValueOnce({ rows: [mockCreatedUser] });

      await googleVerifyCallback('access', 'refresh', mockProfile, mockDone);

      // Verify queries
      expect(pool.query).toHaveBeenNthCalledWith(1, 'SELECT * FROM users WHERE email = $1', [
        'oauth@example.com',
      ]);
      expect(pool.query).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('INSERT INTO users'),
        ['oauth@example.com', 'Google User', 'https://avatar-url.com/pic.jpg', 'GOOGLE_AUTH', 'user']
      );

      expect(mockDone).toHaveBeenCalledWith(null, mockCreatedUser);
    });

    it('should set avatar to null if photos array is empty or undefined', async () => {
      const profileNoPhoto = {
        emails: [{ value: 'oauth@example.com' }],
        displayName: 'Google User',
      };

      pool.query.mockResolvedValueOnce({ rows: [] });
      const mockCreatedUser = {
        user_id: 89,
        email: 'oauth@example.com',
        username: 'Google User',
        avatar: null,
        password_hash: 'GOOGLE_AUTH',
        role: 'user',
      };
      pool.query.mockResolvedValueOnce({ rows: [mockCreatedUser] });

      await googleVerifyCallback('access', 'refresh', profileNoPhoto, mockDone);

      expect(pool.query).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        ['oauth@example.com', 'Google User', null, 'GOOGLE_AUTH', 'user']
      );
      expect(mockDone).toHaveBeenCalledWith(null, mockCreatedUser);
    });
  });

  describe('Test 2 - Google OAuth returning user', { tags: '@A_R6' }, () => {
    it('should find the user, skip user creation, and return the existing user payload', async () => {
      const mockExistingUser = {
        user_id: 88,
        email: 'oauth@example.com',
        username: 'Google User',
        avatar: 'https://avatar-url.com/pic.jpg',
        password_hash: 'GOOGLE_AUTH',
        role: 'user',
      };
      pool.query.mockResolvedValueOnce({ rows: [mockExistingUser] });

      await googleVerifyCallback('access', 'refresh', mockProfile, mockDone);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', [
        'oauth@example.com',
      ]);
      expect(mockDone).toHaveBeenCalledWith(null, mockExistingUser);
    });
  });

  describe('Test 3 - Google Sign-In with Pre-existing Password Account (NFR)', { tags: '@A_R2' }, () => {
    it('should refuse authentication and not leak the existing password-based account', async () => {
      const mockPasswordUser = {
        user_id: 99,
        email: 'oauth@example.com',
        username: 'Existing Password User',
        avatar: null,
        password_hash: '$2b$10$bcrypt-hash-xyz', // Bcrypt password hash
        role: 'user',
      };
      pool.query.mockResolvedValueOnce({ rows: [mockPasswordUser] });

      await googleVerifyCallback('access', 'refresh', mockProfile, mockDone);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(pool.query).not.toHaveBeenCalledWith(expect.stringContaining('INSERT'), expect.any(Array));
      expect(mockDone).toHaveBeenCalledWith(null, false, expect.any(Object));
    });
  });

  describe('Test 4 - Infrastructure failure handling', { tags: '@A_R8' }, () => {
    it('should propagate database query failures to Passport done callback', async () => {
      const dbError = new Error('Database pool query timeout');
      pool.query.mockRejectedValueOnce(dbError);

      await googleVerifyCallback('access', 'refresh', mockProfile, mockDone);

      expect(mockDone).toHaveBeenCalledWith(dbError, null);
    });
  });

  describe('Test 5 - Transactional consistency (documented absence)', { tags: '@A_R9' }, () => {
    it('should run direct pool query calls instead of passing transaction clients', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      pool.query.mockResolvedValueOnce({ rows: [{ user_id: 88 }] });

      await googleVerifyCallback('access', 'refresh', mockProfile, mockDone);

      // Verify that the queries are called on the pool object directly without transaction wrappers
      expect(pool.query).toHaveBeenCalledTimes(2);
    });
  });

  describe('Test 6 - Suspended user rejection', () => {
    it('should reject authentication with USER_SUSPENDED if the user status is suspended', async () => {
      const mockSuspendedUser = {
        user_id: 88,
        email: 'oauth@example.com',
        username: 'Google User',
        avatar: 'https://avatar-url.com/pic.jpg',
        password_hash: 'GOOGLE_AUTH',
        role: 'user',
        status: 'suspended',
      };
      pool.query.mockResolvedValueOnce({ rows: [mockSuspendedUser] });

      await googleVerifyCallback('access', 'refresh', mockProfile, mockDone);

      expect(mockDone).toHaveBeenCalledWith(null, false, { message: 'USER_SUSPENDED' });
    });
  });
});
