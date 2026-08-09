import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { signToken, buildUserPayload } from '../../src/utils/authHelpers.mjs';
import authRoutes from '../../src/routes/auth.routes.mjs';

vi.mock('../../src/config/passport.mjs', () => {
  return {
    default: {
      authenticate: vi.fn((strategy, options) => {
        return (req, res, next) => {
          if (options && options.failureRedirect) {
            // Callback route mock behavior
            if (req.query.fail === 'true') {
              return res.redirect(options.failureRedirect);
            }
            req.user = {
              user_id: 101,
              email: 'google-api@example.com',
              username: 'google_api_user',
              avatar: 'https://avatar.com/pic.jpg',
              role: 'user',
            };
            next();
          } else {
            // Initiator route mock behavior: simulate passport redirect to Google
            res.redirect('https://accounts.google.com/o/oauth2/v2/auth?scope=profile+email');
          }
        };
      }),
    },
    googleVerifyCallback: vi.fn(),
  };
});

vi.mock('../../src/utils/authHelpers.mjs', () => ({
  signToken: vi.fn(),
  buildUserPayload: vi.fn(),
  withTransaction: vi.fn(),
  replacePendingUser: vi.fn(),
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Google OAuth API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test 1 - Correct HTTP response/redirect for Google Auth Initiator', { tags: '@A_R10' }, () => {
    it('[TC-INT-GA-001] should redirect the browser (302) to Google OAuth server on GET /auth/google', async () => {
      const res = await request(app).get('/auth/google');
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('https://accounts.google.com/o/oauth2/v2/auth');
    });
  });

  describe('Test 2 - Successful Google callback redirect', { tags: ['@A_R5', '@A_R6', '@A_R10'] }, () => {
    it('[TC-INT-GA-002] should authenticate the user, sign JWT, and redirect user to the client dashboard callback url', async () => {
      const mockToken = 'mocked-integration-jwt-token';
      const mockUserPayload = {
        userId: 101,
        email: 'google-api@example.com',
        username: 'google_api_user',
        avatar: 'https://avatar.com/pic.jpg',
        role: 'user',
      };

      signToken.mockReturnValue(mockToken);
      buildUserPayload.mockReturnValue(mockUserPayload);

      const res = await request(app).get('/auth/google/callback');

      expect(res.status).toBe(302);
      expect(signToken).toHaveBeenCalledWith(101, 'google-api@example.com');
      expect(buildUserPayload).toHaveBeenCalled();

      const expectedRedirect = `${process.env.CLIENT_URL}/auth/callback?token=${mockToken}&user=${encodeURIComponent(
        JSON.stringify(mockUserPayload)
      )}`;
      expect(res.headers.location).toBe(expectedRedirect);
    });
  });

  describe('Test 3 - Callback failure redirect', { tags: ['@A_R2', '@A_R8', '@A_R10'] }, () => {
    it('[TC-INT-GA-003] should redirect the user (302) to the login screen on failure', async () => {
      const res = await request(app).get('/auth/google/callback?fail=true');
      expect(res.status).toBe(302);
      expect(res.headers.location).toBe(`${process.env.CLIENT_URL}/login`);
    });
  });
});
