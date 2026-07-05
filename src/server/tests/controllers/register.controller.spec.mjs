import { vi } from 'vitest';
import {
  findUserByEmail,
  getPendingByEmail,
  deletePendingByEmail,
} from '../../src/models/auth.models.mjs';
import {
  withTransaction,
  replacePendingUser,
} from '../../src/utils/authHelpers.mjs';
import { sendVerificationEmail } from '../../src/utils/mailer.mjs';
import bcrypt from 'bcryptjs';
import { register } from '../../src/controllers/auth.controllers.mjs';

vi.mock('../../src/models/auth.models.mjs', () => ({
  findUserByEmail: vi.fn(),
  getPendingByEmail: vi.fn(),
  deletePendingByEmail: vi.fn(),
  deletePendingByToken: vi.fn(),
  getPendingByToken: vi.fn(),
  insertUserFromPending: vi.fn(),
}));

vi.mock('../../src/utils/authHelpers.mjs', () => ({
  withTransaction: vi.fn(),
  replacePendingUser: vi.fn(),
  buildUserPayload: vi.fn(),
  SALT_ROUNDS: 10,
  signToken: vi.fn(),
}));

vi.mock('../../src/utils/mailer.mjs', () => ({
  sendVerificationEmail: vi.fn(),
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

describe('Auth Controller - Register', () => {
  let req;
  let res;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      body: {
        email: 'student@example.com',
        password: 'Password123',
        username: 'student_user',
      },
    };

    res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
  });

  // Scenario 1
  it('Scenario 1: should register successfully with valid details (return 201, hash password, create pending user, and send verification email)', async () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed_password_123');
    withTransaction.mockImplementation(async (callback) => callback({}));
    replacePendingUser.mockResolvedValue('mock-token-xyz');
    sendVerificationEmail.mockResolvedValue(true);

    await register(req, res);

    expect(findUserByEmail).toHaveBeenCalledWith('student@example.com');
    expect(getPendingByEmail).toHaveBeenCalledWith('student@example.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
    expect(withTransaction).toHaveBeenCalled();
    expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), {
      email: 'student@example.com',
      passwordHash: 'hashed_password_123',
      username: 'student_user',
    });
    expect(sendVerificationEmail).toHaveBeenCalledWith('student@example.com', 'mock-token-xyz');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Verification email sent. Please check your inbox.',
    });
  });

  // Scenario 2
  it('Scenario 2: should return 409 when email already exists in users table', async () => {
    findUserByEmail.mockResolvedValue({ user_id: 1, email: 'student@example.com' });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email already exists' });
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });

  // Scenario 3
  it('Scenario 3: should return 409 when an active pending registration already exists', async () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue({
      email: 'student@example.com',
      expired_at: new Date(Date.now() + 60000).toISOString(),
    });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      error: 'A verification email has already been sent. Please check your inbox.',
    });
    expect(deletePendingByEmail).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(replacePendingUser).not.toHaveBeenCalled();
  });

  // Scenario 4
  it('Scenario 4: should delete expired pending record and proceed with new registration', async () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue({
      email: 'student@example.com',
      expired_at: new Date(Date.now() - 60000).toISOString(),
    });
    deletePendingByEmail.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue('hashed_password_123');
    withTransaction.mockImplementation(async (callback) => callback({}));
    replacePendingUser.mockResolvedValue('new-mock-token');
    sendVerificationEmail.mockResolvedValue(true);

    await register(req, res);

    expect(deletePendingByEmail).toHaveBeenCalledWith('student@example.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
    expect(replacePendingUser).toHaveBeenCalled();
    expect(sendVerificationEmail).toHaveBeenCalledWith('student@example.com', 'new-mock-token');
    expect(res.status).toHaveBeenCalledWith(201);
  });

  // Scenario 5
  it('Scenario 5: should return 400 when database error occurs during existing user check', async () => {
    findUserByEmail.mockRejectedValue(new Error('DB failure checking user'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'DB failure checking user' });
    expect(getPendingByEmail).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  // Scenario 6
  it('Scenario 6: should return 400 when database error occurs during pending registration check', async () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockRejectedValue(new Error('DB failure checking pending'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'DB failure checking pending' });
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  // Scenario 7
  it('Scenario 7: should return 400 when password hashing fails', async () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue(null);
    bcrypt.hash.mockRejectedValue(new Error('Bcrypt hash failure'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Bcrypt hash failure' });
    expect(withTransaction).not.toHaveBeenCalled();
  });

  // Scenario 8
  it('Scenario 8: should return 400 when database transaction or pending user insertion fails', async () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed_pwd');
    withTransaction.mockRejectedValue(new Error('Transaction rollback/insert failed'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Transaction rollback/insert failed' });
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });

  // Scenario 9
  it('Scenario 9: should return 400 when verification email delivery fails', async () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed_pwd');
    withTransaction.mockImplementation(async (callback) => callback({}));
    replacePendingUser.mockResolvedValue('mock-token-abc');
    sendVerificationEmail.mockRejectedValue(new Error('SMTP transmission error'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'SMTP transmission error' });
  });

  // Scenario 10
  it('Scenario 10: should return 400 and halt when deleting expired pending record fails', async () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue({
      email: 'student@example.com',
      expired_at: new Date(Date.now() - 60000).toISOString(),
    });
    deletePendingByEmail.mockRejectedValue(new Error('Failed to delete expired pending record'));

    await register(req, res);

    expect(deletePendingByEmail).toHaveBeenCalledWith('student@example.com');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete expired pending record' });
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(replacePendingUser).not.toHaveBeenCalled();
  });
});
