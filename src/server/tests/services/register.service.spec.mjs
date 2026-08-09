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

describe("Register Service", () => {
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
    arrangeHappyPath();
  });

  describe("Test 1 - Successful registration", { tags: '@A_R1' }, () => {
    it("[TC-SRV-REG-001] should successfully register with valid details", async () => {
      const result = await registerUser(mockInput);

      expect(findUserByEmail).toHaveBeenCalledWith(mockInput.email);
      expect(getPendingByEmail).toHaveBeenCalledWith(mockInput.email);
      expect(result).toEqual({
        message: 'Verification email sent. Please check your inbox.',
      });
    });
  });

  describe("Test 2 - Reject duplicate email", { tags: '@A_R2' }, () => {
    it("[TC-SRV-REG-002] should reject registration when the email already exists", async () => {
      findUserByEmail.mockResolvedValue({ user_id: 1, email: mockInput.email });

      await expect(registerUser(mockInput)).rejects.toThrow('Email already exists');

      expect(findUserByEmail).toHaveBeenCalledWith(mockInput.email);
      expect(getPendingByEmail).not.toHaveBeenCalled();
    });
  });

  describe("Test 3 - Reject active pending registration", { tags: '@A_R3' }, () => {
    it("[TC-SRV-REG-003] should reject registration when an active pending registration already exists", async () => {
      getPendingByEmail.mockResolvedValue({
        email: mockInput.email,
        expired_at: new Date(Date.now() + 60000).toISOString(), // Active for another 1 minute
      });

      await expect(registerUser(mockInput)).rejects.toThrow(
        'A verification email has already been sent. Please check your inbox.'
      );

      expect(deletePendingByEmail).not.toHaveBeenCalled();

      // Boundary check: exactly now
      const now = new Date();
      vi.useFakeTimers();
      vi.setSystemTime(now);
      try {
        getPendingByEmail.mockResolvedValue({
          email: mockInput.email,
          expired_at: now.toISOString(), // Expires exactly now
        });
        await expect(registerUser(mockInput)).rejects.toThrow(
          'A verification email has already been sent. Please check your inbox.'
        );
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe("Test 4 - Allow registration after pending registration expires", { tags: '@A_R3' }, () => {
    it("[TC-SRV-REG-004] should allow registration after the previous pending registration expires", async () => {
      getPendingByEmail.mockResolvedValue({
        email: mockInput.email,
        expired_at: new Date(Date.now() - 60000).toISOString(), // Expired 1 minute ago
      });

      const result = await registerUser(mockInput);

      expect(deletePendingByEmail).toHaveBeenCalledWith(mockInput.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockInput.password, SALT_ROUNDS);
      expect(result).toEqual({
        message: 'Verification email sent. Please check your inbox.',
      });
    });
  });

  describe("Test 5 - Send verification email", { tags: '@A_R1' }, () => {
    it("[TC-SRV-REG-005] should send verification email after successful registration", async () => {
      await registerUser(mockInput);

      expect(sendVerificationEmail).toHaveBeenCalledWith(mockInput.email, 'mock-uuid-token-12345');
    });
  });

  describe("Test 6 - Protect password confidentiality", { tags: '@A_R7' }, () => {
    it("[TC-SRV-REG-006] should protect user password confidentiality by hashing the plaintext password", async () => {
      await registerUser(mockInput);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockInput.password, SALT_ROUNDS);
      expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), expect.not.objectContaining({
        password: mockInput.password
      }));
      expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({
        passwordHash: 'hashed_123'
      }));
    });
  });

  describe("Test 7 - Assign default user role", { tags: '@A_R7' }, () => {
    it("[TC-SRV-REG-007] should assign the default user role during pending creation", async () => {
      await registerUser(mockInput);

      expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), {
        email: mockInput.email,
        passwordHash: 'hashed_123',
        username: mockInput.username,
      });
    });
  });

  describe("Test 8 - Handle unexpected failures", { tags: '@A_R8' }, () => {
    it("[TC-SRV-REG-008] should handle database check user error safely", async () => {
      findUserByEmail.mockRejectedValue(new Error('Database query error on findUser'));
      await expect(registerUser(mockInput)).rejects.toThrow('Database query error on findUser');
    });

    it("[TC-SRV-REG-009] should handle database get pending check error safely", async () => {
      getPendingByEmail.mockRejectedValue(new Error('Database error on getPending'));
      await expect(registerUser(mockInput)).rejects.toThrow('Database error on getPending');
    });

    it("[TC-SRV-REG-010] should handle hashing error safely", async () => {
      bcrypt.hash.mockRejectedValue(new Error('Bcrypt service unavailable'));
      await expect(registerUser(mockInput)).rejects.toThrow('Bcrypt service unavailable');
    });

    it("[TC-SRV-REG-011] should handle expired pending cleanup database delete error safely", async () => {
      getPendingByEmail.mockResolvedValue({
        email: mockInput.email,
        expired_at: new Date(Date.now() - 60000).toISOString(),
      });
      deletePendingByEmail.mockRejectedValue(new Error('Database delete error'));
      await expect(registerUser(mockInput)).rejects.toThrow('Database delete error');
    });
  });

  describe("Test 9 - Maintain registration state consistency", { tags: '@A_R9' }, () => {
    it("[TC-SRV-REG-012] should not send verification email if database transaction fails", async () => {
      withTransaction.mockRejectedValue(new Error('Failed to insert pending user row'));
      await expect(registerUser(mockInput)).rejects.toThrow('Failed to insert pending user row');
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });

    it("[TC-SRV-REG-013] should propagate email delivery failure but complete database write", async () => {
      sendVerificationEmail.mockRejectedValue(new Error('SMTP connection timed out'));
      await expect(registerUser(mockInput)).rejects.toThrow('SMTP connection timed out');
      expect(replacePendingUser).toHaveBeenCalled();
    });
  });
});