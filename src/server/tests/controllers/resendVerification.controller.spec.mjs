import { vi, describe, it, expect, beforeEach } from 'vitest';
import { resendVerificationEmailService } from '../../src/services/auth.services.mjs';
import { resendVerification } from '../../src/controllers/auth.controllers.mjs';

vi.mock('../../src/services/auth.services.mjs', () => ({
  resendVerificationEmailService: vi.fn(),
  registerUser: vi.fn(),
  loginUser: vi.fn(),
  verifyEmail: vi.fn(),
}));

describe('Resend Verification Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      body: {
        email: 'resend@example.com',
      },
    };

    res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
  });

  describe('Test 1 - Correct HTTP response/redirect for every outcome', { tags: '@A_R10' }, () => {
    it('[TC-CTL-RV-001] should return 200 OK with success message on success', async () => {
      const mockResult = { message: 'Verification email resent successfully.' };
      resendVerificationEmailService.mockResolvedValue(mockResult);

      await resendVerification(req, res);

      expect(resendVerificationEmailService).toHaveBeenCalledWith({ email: 'resend@example.com' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('[TC-CTL-RV-002] should return 400 Bad Request if email is missing in request body', async () => {
      req.body.email = undefined;

      await resendVerification(req, res);

      expect(resendVerificationEmailService).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email is required' });
    });
  });

  describe('Test 2 - Infrastructure failure mapping (500 vs 400)', { tags: ['@A_R4', '@A_R8'] }, () => {
    it('[TC-CTL-RV-003] should return 400 Bad Request if service throws "No pending..." exception', async () => {
      resendVerificationEmailService.mockRejectedValue(
        new Error('No pending registration found for this email. Please register again.')
      );

      await resendVerification(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'No pending registration found for this email. Please register again.',
      });
    });

    it('[TC-CTL-RV-004] should return 500 Internal Server Error for unexpected database or mailer failures', async () => {
      resendVerificationEmailService.mockRejectedValue(new Error('PostgreSQL database query failure'));

      await resendVerification(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'PostgreSQL database query failure' });
    });
  });
});
