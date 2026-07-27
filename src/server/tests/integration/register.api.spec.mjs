import { vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import pool from '../../src/config/postgres.mjs';
import { sendVerificationEmail } from '../../src/utils/mailer.mjs';
import bcrypt from 'bcryptjs';
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

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe("Register API", () => {
  let mockClient;

  const arrangeHappyPath = () => {
    mockClient = {
      query: vi.fn(),
      release: vi.fn(),
    };

    pool.connect.mockResolvedValue(mockClient);
    mockClient.query.mockResolvedValue({ rows: [] });
    pool.query.mockResolvedValue({ rows: [] });
    bcrypt.hash.mockResolvedValue('mocked_hashed_password');
    sendVerificationEmail.mockResolvedValue(true);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    arrangeHappyPath();
  });

  describe("Test 1 - Successful registration", { tags: '@A_R1' }, () => {
    it("should register successfully via the API endpoint", async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'integration@example.com',
          password: 'Password123',
          username: 'integration_user',
        });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        message: 'Verification email sent. Please check your inbox.',
      });
      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    });
  });

  describe("Test 2 - Reject duplicate email", { tags: '@A_R2' }, () => {
    it("should return 409 when email already exists", async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ user_id: 1, email: 'dup@example.com' }] }); // findUserByEmail

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'dup@example.com',
          password: 'Password123',
          username: 'dup_user',
        });

      expect(res.status).toBe(409);
      expect(res.body).toEqual({ error: 'Email already exists' });
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });
  });

  describe("Test 3 - Reject active pending registration", { tags: '@A_R3' }, () => {
    it("should return 409 when an active pending registration already exists", async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
      pool.query.mockResolvedValueOnce({
        rows: [{ email: 'pending@example.com', expired_at: new Date(Date.now() + 60000).toISOString() }],
      }); // getPendingByEmail

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'pending@example.com',
          password: 'Password123',
          username: 'pending_user',
        });

      expect(res.status).toBe(409);
      expect(res.body).toEqual({
        error: 'A verification email has already been sent. Please check your inbox.',
      });
      expect(bcrypt.hash).not.toHaveBeenCalled();

      // Boundary check: exactly now
      vi.clearAllMocks();
      arrangeHappyPath();
      const now = new Date();
      vi.useFakeTimers();
      vi.setSystemTime(now);
      try {
        pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
        pool.query.mockResolvedValueOnce({
          rows: [{ email: 'pending@example.com', expired_at: now.toISOString() }],
        }); // getPendingByEmail

        const resBoundary = await request(app)
          .post('/auth/register')
          .send({
            email: 'pending@example.com',
            password: 'Password123',
            username: 'pending_user',
          });

        expect(resBoundary.status).toBe(409);
        expect(resBoundary.body).toEqual({
          error: 'A verification email has already been sent. Please check your inbox.',
        });
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe("Test 4 - Allow registration after pending registration expires", { tags: '@A_R3' }, () => {
    it("should delete expired pending record and proceed with new registration", async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
      pool.query.mockResolvedValueOnce({
        rows: [{ email: 'expired@example.com', expired_at: new Date(Date.now() - 60000).toISOString() }],
      }); // getPendingByEmail
      pool.query.mockResolvedValueOnce({ rows: [] }); // deletePendingByEmail

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'expired@example.com',
          password: 'Password123',
          username: 'expired_user',
        });

      expect(res.status).toBe(201);
      expect(pool.query).toHaveBeenCalledTimes(3); // find, getPending, deletePending
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    });
  });

  describe("Test 5 - Send verification email", { tags: '@A_R1' }, () => {
    it("should send verification email to user after registration", async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'integration@example.com',
          password: 'Password123',
          username: 'integration_user',
        });

      expect(res.status).toBe(201);
      expect(sendVerificationEmail).toHaveBeenCalledWith('integration@example.com', expect.any(String));
    });
  });

  describe("Test 6 - Protect password confidentiality", { tags: '@A_R7' }, () => {
    it("should protect user password confidentiality by hashing the password", async () => {
      await request(app)
        .post('/auth/register')
        .send({
          email: 'integration@example.com',
          password: 'Password123',
          username: 'integration_user',
        });

      expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO pending_users'),
        expect.not.arrayContaining(['Password123'])
      );
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO pending_users'),
        expect.arrayContaining(['mocked_hashed_password'])
      );
    });
  });

  describe("Test 7 - Assign default user role", { tags: '@A_R7' }, () => {
    it("should assign the default role 'user' when creating pending record", async () => {
      await request(app)
        .post('/auth/register')
        .send({
          email: 'integration@example.com',
          password: 'Password123',
          username: 'integration_user',
        });

      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO pending_users'),
        expect.arrayContaining(['user'])
      );
    });
  });

  describe("Test 8 - Handle unexpected failures", { tags: '@A_R8' }, () => {
    it("should return status 500 on database error during user check", async () => {
      pool.query.mockRejectedValueOnce(new Error('DB error on check user'));
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'error@example.com',
          password: 'Password123',
          username: 'error_user',
        });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'DB error on check user' });
    });

    it("should return status 500 on database error during pending check", async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
      pool.query.mockRejectedValueOnce(new Error('DB error on check pending'));
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'error@example.com',
          password: 'Password123',
          username: 'error_user',
        });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'DB error on check pending' });
    });

    it("should return status 500 on password hashing error", async () => {
      bcrypt.hash.mockRejectedValueOnce(new Error('Bcrypt hash failure'));
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'error@example.com',
          password: 'Password123',
          username: 'error_user',
        });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Bcrypt hash failure' });
    });

    it("should return status 500 on database error during expired pending cleanup", async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
      pool.query.mockResolvedValueOnce({
        rows: [{ email: 'expired@example.com', expired_at: new Date(Date.now() - 60000).toISOString() }],
      }); // getPendingByEmail
      pool.query.mockRejectedValueOnce(new Error('DB error on delete pending')); // deletePendingByEmail
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'expired@example.com',
          password: 'Password123',
          username: 'expired_user',
        });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'DB error on delete pending' });
    });
  });

  describe("Test 9 - Maintain registration state consistency", { tags: '@A_R9' }, () => {
    it("should rollback database transaction and not send verification email when insert fails", async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
      pool.query.mockResolvedValueOnce({ rows: [] }); // getPendingByEmail
      mockClient.query.mockImplementation((sql) => {
        if (sql.includes('INSERT')) {
          return Promise.reject(new Error('Transaction insert error'));
        }
        return Promise.resolve({ rows: [] });
      });

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'error@example.com',
          password: 'Password123',
          username: 'error_user',
        });

      expect(res.status).toBe(500);
      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });

    it("should complete database write but propagate mailing error when SMTP is down", async () => {
      sendVerificationEmail.mockRejectedValueOnce(new Error('SMTP service down'));

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'error@example.com',
          password: 'Password123',
          username: 'error_user',
        });

      expect(res.status).toBe(500);
      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    });
  });
});
