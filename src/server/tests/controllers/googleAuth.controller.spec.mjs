import { vi, describe, it, expect, beforeEach } from 'vitest';
import { signToken, buildUserPayload } from '../../src/utils/authHelpers.mjs';
import { googleCallback } from '../../src/controllers/auth.controllers.mjs';

vi.mock('../../src/utils/authHelpers.mjs', () => ({
  signToken: vi.fn(),
  buildUserPayload: vi.fn(),
  withTransaction: vi.fn(),
  replacePendingUser: vi.fn(),
}));

describe('Google OAuth Controller Handler', () => {
  let req;
  let res;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      user: {
        user_id: 101,
        email: 'google@example.com',
        username: 'google_user',
        avatar: 'https://avatar.com/pic.jpg',
        password_hash: 'GOOGLE_AUTH',
        role: 'user',
      },
    };

    res = {
      redirect: vi.fn(),
    };
  });

  describe('Test 1 - Correct HTTP response/redirect for Google callback', { tags: ['@A_R5', '@A_R6', '@A_R10'] }, () => {
    it('[TC-CTL-GA-001] should sign a JWT, construct user payload, and redirect browser (302) with URI-encoded payload', async () => {
      const handler = googleCallback[1];
      const mockToken = 'mocked-jwt-token-google';
      const mockPayload = {
        userId: 101,
        email: 'google@example.com',
        username: 'google_user',
        avatar: 'https://avatar.com/pic.jpg',
        role: 'user',
      };

      signToken.mockReturnValue(mockToken);
      buildUserPayload.mockReturnValue(mockPayload);

      await handler(req, res);

      expect(signToken).toHaveBeenCalledWith(101, 'google@example.com');
      expect(buildUserPayload).toHaveBeenCalledWith(req.user);
      expect(res.redirect).toHaveBeenCalledWith(
        `${process.env.CLIENT_URL}/auth/callback?token=${mockToken}&user=${encodeURIComponent(
          JSON.stringify(mockPayload)
        )}`
      );
    });
  });

  describe('Test 2 - Security and data-shape invariants (Google Callback)', { tags: '@A_R7' }, () => {
    it('[TC-CTL-GA-002] should never leak password_hash in redirection payload', async () => {
      const handler = googleCallback[1];
      const mockToken = 'mocked-jwt-token-google';
      const mockPayload = {
        userId: 101,
        email: 'google@example.com',
        username: 'google_user',
        avatar: 'https://avatar.com/pic.jpg',
        role: 'user',
      };

      signToken.mockReturnValue(mockToken);
      buildUserPayload.mockReturnValue(mockPayload);

      await handler(req, res);

      // Verify buildUserPayload is called with req.user (which contains password_hash)
      expect(buildUserPayload).toHaveBeenCalledWith(req.user);
      // Ensure the redirect URL does not contain 'GOOGLE_AUTH' or password_hash anywhere
      const redirectUrl = res.redirect.mock.calls[0][0];
      expect(redirectUrl).not.toContain('GOOGLE_AUTH');
      expect(redirectUrl).not.toContain('password_hash');
    });
  });
});
