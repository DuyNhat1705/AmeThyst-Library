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

describe("Register Controller", () => {
  let req;
  let res;

  const arrangeHappyPath = () => {
    findUserByEmail.mockResolvedValue(null);
    getPendingByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed_password_123');
    withTransaction.mockImplementation(async (callback) => callback({}));
    replacePendingUser.mockResolvedValue('mock-token-xyz');
    sendVerificationEmail.mockResolvedValue(true);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    arrangeHappyPath();

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

  describe("Test 1 - Successful registration", { tags: '@A_R1' }, () => {
    it("should register successfully with valid details", async () => {
      await register(req, res);

      expect(findUserByEmail).toHaveBeenCalledWith('student@example.com');
      expect(getPendingByEmail).toHaveBeenCalledWith('student@example.com');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Verification email sent. Please check your inbox.',
      });
    });
  });

  describe("Test 2 - Reject duplicate email", { tags: '@A_R2' }, () => {
    it("should return 409 when email already exists in users table", async () => {
      findUserByEmail.mockResolvedValue({ user_id: 1, email: 'student@example.com' });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already exists' });
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });
  });

  describe("Test 3 - Reject active pending registration", { tags: '@A_R3' }, () => {
    it("should return 409 when an active pending registration already exists", async () => {
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

      // Boundary check: exactly now
      vi.clearAllMocks();
      arrangeHappyPath();
      const now = new Date();
      vi.useFakeTimers();
      vi.setSystemTime(now);
      try {
        getPendingByEmail.mockResolvedValue({
          email: 'student@example.com',
          expired_at: now.toISOString(),
        });
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
          error: 'A verification email has already been sent. Please check your inbox.',
        });
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe("Test 4 - Allow registration after pending registration expires", { tags: '@A_R3' }, () => {
    it("should delete expired pending record and proceed with new registration", async () => {
      getPendingByEmail.mockResolvedValue({
        email: 'student@example.com',
        expired_at: new Date(Date.now() - 60000).toISOString(),
      });
      deletePendingByEmail.mockResolvedValue(true);

      await register(req, res);

      expect(deletePendingByEmail).toHaveBeenCalledWith('student@example.com');
      expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("Test 5 - Send verification email", { tags: '@A_R1' }, () => {
    it("should send verification email with correctly generated token", async () => {
      await register(req, res);

      expect(sendVerificationEmail).toHaveBeenCalledWith('student@example.com', 'mock-token-xyz');
    });
  });

  describe("Test 6 - Protect password confidentiality", { tags: '@A_R7' }, () => {
    it("should protect user password confidentiality by hashing before database interaction", async () => {
      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
      expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), expect.not.objectContaining({
        password: 'Password123'
      }));
      expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({
        passwordHash: 'hashed_password_123'
      }));
    });
  });

  describe("Test 7 - Assign default user role", { tags: '@A_R7' }, () => {
    it("should delegate pending creation to replacePendingUser which assigns default role", async () => {
      await register(req, res);

      expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), {
        email: 'student@example.com',
        passwordHash: 'hashed_password_123',
        username: 'student_user',
      });
    });
  });

  describe("Test 8 - Handle unexpected failures", { tags: '@A_R8' }, () => {
    it("should handle database check user error safely", async () => {
      findUserByEmail.mockRejectedValue(new Error('DB failure checking user'));
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB failure checking user' });
    });

    it("should handle database get pending check error safely", async () => {
      getPendingByEmail.mockRejectedValue(new Error('DB failure checking pending'));
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB failure checking pending' });
    });

    it("should handle password hashing error safely", async () => {
      bcrypt.hash.mockRejectedValue(new Error('Bcrypt hash failure'));
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Bcrypt hash failure' });
    });

    it("should handle expired pending cleanup error safely", async () => {
      getPendingByEmail.mockResolvedValue({
        email: 'student@example.com',
        expired_at: new Date(Date.now() - 60000).toISOString(),
      });
      deletePendingByEmail.mockRejectedValue(new Error('Failed to delete expired pending record'));
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete expired pending record' });
    });
  });

  describe("Test 9 - Maintain registration state consistency", { tags: '@A_R9' }, () => {
    it("should not send verification email if database transaction fails", async () => {
      withTransaction.mockRejectedValue(new Error('Transaction rollback/insert failed'));
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });

    it("should propagate SMTP email delivery failure but complete database write", async () => {
      sendVerificationEmail.mockRejectedValue(new Error('SMTP transmission error'));
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(replacePendingUser).toHaveBeenCalled();
    });
  });
});
