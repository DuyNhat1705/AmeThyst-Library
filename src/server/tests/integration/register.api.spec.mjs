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

describe('Auth API Integration - POST /auth/register', () => {
  let mockClient;

  beforeEach(() => {
    vi.clearAllMocks();

    mockClient = {
      query: vi.fn(),
      release: vi.fn(),
    };

    pool.connect.mockResolvedValue(mockClient);
    mockClient.query.mockResolvedValue({ rows: [] });
    pool.query.mockResolvedValue({ rows: [] });
    bcrypt.hash.mockResolvedValue('mocked_hashed_password');
    sendVerificationEmail.mockResolvedValue(true);
  });

  // Scenario 1: Successful registration
  it('Scenario 1: should register successfully via the API endpoint', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
    pool.query.mockResolvedValueOnce({ rows: [] }); // getPendingByEmail

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
    expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
    expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
    expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    expect(sendVerificationEmail).toHaveBeenCalledWith('integration@example.com', expect.any(String));
  });

  // Scenario 2: Duplicate email
  it('Scenario 2: should return 409 when email already exists', async () => {
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

  // Scenario 3: Existing pending registration
  it('Scenario 3: should return 409 when an active pending registration exists', async () => {
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
  });

  // Scenario 4: Expired pending registration
  it('Scenario 4: should delete expired pending record and proceed with new registration', async () => {
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
    expect(sendVerificationEmail).toHaveBeenCalled();
  });

  // Scenario 5: Database failure while checking existing user
  it('Scenario 5: should return 400 when database error occurs during existing user check', async () => {
    pool.query.mockRejectedValueOnce(new Error('DB error on check user'));

    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'error@example.com',
        password: 'Password123',
        username: 'error_user',
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'DB error on check user' });
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  // Scenario 6: Database failure while checking pending registration
  it('Scenario 6: should return 400 when database error occurs during pending registration check', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
    pool.query.mockRejectedValueOnce(new Error('DB error on check pending'));

    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'error@example.com',
        password: 'Password123',
        username: 'error_user',
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'DB error on check pending' });
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  // Scenario 7: Password hashing failure
  it('Scenario 7: should return 400 when password hashing fails', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
    pool.query.mockResolvedValueOnce({ rows: [] }); // getPendingByEmail
    bcrypt.hash.mockRejectedValueOnce(new Error('Bcrypt hash failure'));

    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'error@example.com',
        password: 'Password123',
        username: 'error_user',
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Bcrypt hash failure' });
    expect(pool.connect).not.toHaveBeenCalled();
  });

  // Scenario 8: Transaction / pending-user creation failure
  it('Scenario 8: should return 400 and rollback when database transaction fails', async () => {
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

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Transaction insert error' });
    expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
    expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });

  // Scenario 9: Verification email sending failure
  it('Scenario 9: should return 400 when verification email delivery fails', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail
    pool.query.mockResolvedValueOnce({ rows: [] }); // getPendingByEmail
    sendVerificationEmail.mockRejectedValueOnce(new Error('SMTP service down'));

    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'error@example.com',
        password: 'Password123',
        username: 'error_user',
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'SMTP service down' });
    expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
    expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
  });

  // Scenario 10: Expired pending cleanup failure
  it('Scenario 10: should return 400 when deleting expired pending record fails', async () => {
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

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'DB error on delete pending' });
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(pool.connect).not.toHaveBeenCalled();
  });
});
