import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import pool from '../../src/config/postgres.mjs';
import { sendVerificationEmail } from '../../src/utils/mailer.mjs';
import authRoutes from '../../src/routes/auth.routes.mjs';

vi.mock('../../src/config/postgres.mjs', () => {
  const queryMock = vi.fn();
  const connectMock = vi.fn();
  return {
    default: {
      query: queryMock,
      connect: connectMock,
      on: vi.fn(),
    },
  };
});

vi.mock('../../src/utils/mailer.mjs', () => ({
  sendVerificationEmail: vi.fn(),
  sendOTPEmail: vi.fn(),
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Resend Verification API Integration', () => {
  let mockClient;
  const mockEmail = 'resend-api@example.com';

  beforeEach(() => {
    vi.clearAllMocks();

    mockClient = {
      query: vi.fn(),
      release: vi.fn(),
    };

    pool.connect.mockResolvedValue(mockClient);
    mockClient.query.mockResolvedValue({ rows: [] });
    pool.query.mockResolvedValue({ rows: [] });
    sendVerificationEmail.mockResolvedValue(true);
  });

  describe('Test 1 - Successful resend', { tags: ['@A_R4', '@A_R9', '@A_R10'] }, () => {
    it('should return 200 OK with success message', async () => {
      const mockPendingRow = {
        email: mockEmail,
        password_hash: 'hashed_pwd_abc',
        username: 'resend_api_user',
      };

      // 1. getPendingByEmail
      pool.query.mockResolvedValueOnce({ rows: [mockPendingRow] });

      // Inside transaction:
      mockClient.query.mockImplementation(async (sql) => {
        if (sql.includes('INSERT INTO pending_users')) {
          return { rows: [] };
        }
        return { rows: [] };
      });

      const res = await request(app)
        .post('/auth/resend-verification')
        .send({ email: mockEmail });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Verification email resent successfully.' });
      expect(sendVerificationEmail).toHaveBeenCalledWith(mockEmail, expect.any(String));

      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    });
  });

  describe('Test 2 - Validation errors', { tags: ['@A_R4', '@A_R10'] }, () => {
    it('should return 400 Bad Request when email is missing', async () => {
      const res = await request(app)
        .post('/auth/resend-verification')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Email is required' });
    });

    it('should return 400 Bad Request when no pending registration exists', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // getPendingByEmail returns empty

      const res = await request(app)
        .post('/auth/resend-verification')
        .send({ email: mockEmail });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: 'No pending registration found for this email. Please register again.',
      });
    });
  });

  describe('Test 3 - Infrastructure failures mapping to 500', { tags: ['@A_R8', '@A_R9', '@A_R10'] }, () => {
    it('should return 500 Internal Server Error when database queries fail', async () => {
      pool.query.mockRejectedValueOnce(new Error('Postgres pool query failure'));

      const res = await request(app)
        .post('/auth/resend-verification')
        .send({ email: mockEmail });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Postgres pool query failure' });
    });

    it('should return 500 Internal Server Error and commit transaction but fail on mailer throws', async () => {
      const mockPendingRow = {
        email: mockEmail,
        password_hash: 'hashed_pwd_abc',
        username: 'resend_api_user',
      };

      pool.query.mockResolvedValueOnce({ rows: [mockPendingRow] });
      sendVerificationEmail.mockRejectedValueOnce(new Error('SMTP timeout exception'));

      const res = await request(app)
        .post('/auth/resend-verification')
        .send({ email: mockEmail });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'SMTP timeout exception' });
      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT'); // Transaction committed before email dispatch
    });
  });
});
