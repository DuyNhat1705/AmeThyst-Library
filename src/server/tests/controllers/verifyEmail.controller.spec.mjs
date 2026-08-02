import { vi, describe, it, expect, beforeEach } from 'vitest';
import { verifyEmail } from '../../src/services/auth.services.mjs';
import { verifyEmailHandler } from '../../src/controllers/auth.controllers.mjs';

vi.mock('../../src/services/auth.services.mjs', () => ({
  verifyEmail: vi.fn(),
  registerUser: vi.fn(),
  loginUser: vi.fn(),
  resendVerificationEmailService: vi.fn(),
}));

describe('Verify Email Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      body: {
        token: 'test-token-uuid-123',
      },
    };

    res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
  });

  describe('Test 1 - Correct HTTP response/redirect for every outcome', { tags: '@A_R10' }, () => {
    it('should return 200 OK with JWT and user payload on success', async () => {
      const mockResult = {
        token: 'signed-jwt-token',
        user: { userId: 5, email: 'student@example.com', username: 'student' },
      };
      verifyEmail.mockResolvedValue(mockResult);

      await verifyEmailHandler(req, res);

      expect(verifyEmail).toHaveBeenCalledWith({ token: 'test-token-uuid-123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 400 Bad Request if token is missing in body', async () => {
      req.body.token = undefined;

      await verifyEmailHandler(req, res);

      expect(verifyEmail).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Verification token is required' });
    });
  });

  describe('Test 2 - TTL and token validation lifecycle mappings', { tags: '@A_R3' }, () => {
    it('should return 410 Gone if verification link has expired', async () => {
      verifyEmail.mockRejectedValue(new Error('Verification link has expired. Please register again.'));

      await verifyEmailHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(410);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Verification link has expired. Please register again.',
      });
    });

    it('should return 400 Bad Request for general invalid token errors', async () => {
      verifyEmail.mockRejectedValue(new Error('Invalid or expired verification link.'));

      await verifyEmailHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid or expired verification link.',
      });
    });
  });

  describe('Test 3 - Infrastructure failure mapping', { tags: '@A_R8' }, () => {
    it('should return 500 Internal Server Error for database check/query exceptions', async () => {
      verifyEmail.mockRejectedValue(new Error('Database query failed'));

      await verifyEmailHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database query failed' });
    });
  });

  describe('Test 4 - Reject duplicate email during verification', { tags: '@A_R2' }, () => {
    it('should return 400 Bad Request if email already exists', async () => {
      verifyEmail.mockRejectedValue(new Error('Email already exists.'));

      await verifyEmailHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already exists.' });
    });
  });
});
