import { vi } from 'vitest';
import {
  findUserByEmail,
  getPendingByEmail,
  deletePendingByEmail,
} from '../../src/models/auth.models.mjs';
import {
  withTransaction,
  replacePendingUser,
  SALT_ROUNDS,
} from '../../src/utils/authHelpers.mjs';
import { sendVerificationEmail } from '../../src/utils/mailer.mjs';
import bcrypt from 'bcryptjs';
import { registerUser } from '../../src/services/auth.services.mjs';

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

describe('Auth Service - registerUser', () => {
  const mockInput = {
    email: 'dunyhat@gmail.com',
    password: 'SecurePassword123',
    username: 'duynhat_vu',
  };

  const arrangeHappyPath = () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed_123');
    withTransaction.mockImplementation(async (callback) => callback({}));
    replacePendingUser.mockResolvedValue('mock-uuid-token-12345');
    sendVerificationEmail.mockResolvedValue(true);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Scenario 1: should register successfully with valid data', async () => {
    arrangeHappyPath();

    const result = await registerUser(mockInput);

    expect(findUserByEmail).toHaveBeenCalledWith(mockInput.email);
    expect(getPendingByEmail).toHaveBeenCalledWith(mockInput.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockInput.password, SALT_ROUNDS);
    expect(withTransaction).toHaveBeenCalled();
    expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), {
      email: mockInput.email,
      passwordHash: 'hashed_123',
      username: mockInput.username,
    });
    expect(sendVerificationEmail).toHaveBeenCalledWith(mockInput.email, 'mock-uuid-token-12345');
    expect(result).toEqual({
      message: 'Verification email sent. Please check your inbox.',
    });
  });

  it('Scenario 2: should fail when email already exists', async () => {
    arrangeHappyPath();
    findUserByEmail.mockResolvedValue({ user_id: 1, email: mockInput.email });

    await expect(registerUser(mockInput)).rejects.toThrow('Email already exists');

    expect(findUserByEmail).toHaveBeenCalledWith(mockInput.email);
    expect(getPendingByEmail).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('Scenario 3: should fail when pending registration is active', async () => {
    arrangeHappyPath();
    getPendingByEmail.mockResolvedValue({
      email: mockInput.email,
      expired_at: new Date(Date.now() + 60000).toISOString(), // Active for another 1 minute
    });

    await expect(registerUser(mockInput)).rejects.toThrow(
      'A verification email has already been sent. Please check your inbox.'
    );

    expect(deletePendingByEmail).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('Scenario 4: should delete expired pending record and proceed with new registration', async () => {
    arrangeHappyPath();
    getPendingByEmail.mockResolvedValue({
      email: mockInput.email,
      expired_at: new Date(Date.now() - 60000).toISOString(), // Expired 1 minute ago
    });

    const result = await registerUser(mockInput);

    expect(deletePendingByEmail).toHaveBeenCalledWith(mockInput.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockInput.password, SALT_ROUNDS);
    expect(withTransaction).toHaveBeenCalledTimes(1);
    expect(replacePendingUser).toHaveBeenCalled();
    expect(sendVerificationEmail).toHaveBeenCalledWith(mockInput.email, 'mock-uuid-token-12345');
    expect(result).toEqual({
      message: 'Verification email sent. Please check your inbox.',
    });
  });

  it('Scenario 5: should propagate database error when checking existing user', async () => {
    arrangeHappyPath();
    findUserByEmail.mockRejectedValue(new Error('Database query error on findUser'));

    await expect(registerUser(mockInput)).rejects.toThrow('Database query error on findUser');

    expect(getPendingByEmail).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('Scenario 6: should propagate database error when checking pending registration', async () => {
    arrangeHappyPath();
    getPendingByEmail.mockRejectedValue(new Error('Database error on getPending'));

    await expect(registerUser(mockInput)).rejects.toThrow('Database error on getPending');

    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('Scenario 7: should fail and propagate error when password hashing fails', async () => {
    arrangeHappyPath();
    bcrypt.hash.mockRejectedValue(new Error('Bcrypt service unavailable'));

    await expect(registerUser(mockInput)).rejects.toThrow('Bcrypt service unavailable');

    expect(withTransaction).not.toHaveBeenCalled();
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });

  it('Scenario 8: should propagate transaction failure', async () => {
    arrangeHappyPath();
    withTransaction.mockRejectedValue(new Error('Failed to insert pending user row'));

    await expect(registerUser(mockInput)).rejects.toThrow('Failed to insert pending user row');

    expect(replacePendingUser).not.toHaveBeenCalled();
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });

  it('Scenario 9: should propagate SMTP error but have completed pending registration DB write', async () => {
    arrangeHappyPath();
    sendVerificationEmail.mockRejectedValue(new Error('SMTP connection timed out'));

    await expect(registerUser(mockInput)).rejects.toThrow('SMTP connection timed out');

    expect(sendVerificationEmail).toHaveBeenCalledWith(mockInput.email, 'mock-uuid-token-12345');
  });

  it('Scenario 10: should fail and stop execution if clearing expired pending record fails', async () => {
    arrangeHappyPath();
    getPendingByEmail.mockResolvedValue({
      email: mockInput.email,
      expired_at: new Date(Date.now() - 60000).toISOString(), // Expired 1 minute ago
    });
    deletePendingByEmail.mockRejectedValue(new Error('Database delete error'));

    await expect(registerUser(mockInput)).rejects.toThrow('Database delete error');

    expect(deletePendingByEmail).toHaveBeenCalledWith(mockInput.email);
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(withTransaction).not.toHaveBeenCalled();
  });

  it('Scenario 11: should block registration if pending registration is exactly at the current time (boundary)', async () => {
    const now = new Date();
    vi.useFakeTimers();
    vi.setSystemTime(now);

    try {
      arrangeHappyPath();
      getPendingByEmail.mockResolvedValue({
        email: mockInput.email,
        expired_at: now.toISOString(), // Expires exactly now
      });

      await expect(registerUser(mockInput)).rejects.toThrow(
        'A verification email has already been sent. Please check your inbox.'
      );

      expect(deletePendingByEmail).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});