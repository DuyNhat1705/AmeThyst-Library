import { vi, describe, it, expect, beforeEach } from 'vitest';
import {
  getPendingByEmail,
} from '../../src/models/auth.models.mjs';
import {
  withTransaction,
  replacePendingUser,
} from '../../src/utils/authHelpers.mjs';
import { sendVerificationEmail } from '../../src/utils/mailer.mjs';
import { resendVerificationEmailService } from '../../src/services/auth.services.mjs';

vi.mock('../../src/models/auth.models.mjs', () => ({
  getPendingByEmail: vi.fn(),
  findUserByEmail: vi.fn(),
  getPendingByToken: vi.fn(),
  deletePendingByToken: vi.fn(),
  deletePendingByEmail: vi.fn(),
  insertUserFromPending: vi.fn(),
}));

vi.mock('../../src/utils/authHelpers.mjs', () => ({
  withTransaction: vi.fn(),
  replacePendingUser: vi.fn(),
  signToken: vi.fn(),
  buildUserPayload: vi.fn(),
}));

vi.mock('../../src/utils/mailer.mjs', () => ({
  sendVerificationEmail: vi.fn(),
}));

describe('Resend Verification Service', () => {
  const mockEmail = 'resend@example.com';
  const mockPendingRow = {
    email: mockEmail,
    password_hash: 'existing_password_hash',
    username: 'resend_user',
    expired_at: new Date(Date.now() - 1000).toISOString(), // Expired or active, resend doesn't care
  };

  const arrangeHappyPath = () => {
    getPendingByEmail.mockResolvedValue(mockPendingRow);
    withTransaction.mockImplementation(async (callback) => callback({}));
    replacePendingUser.mockResolvedValue('new-resend-token-uuid');
    sendVerificationEmail.mockResolvedValue(true);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test 1 - Resend verification email', { tags: '@A_R4' }, () => {
    it('[TC-SRV-RV-001] should fetch the pending record, refresh TTL and token, and send verification email', async () => {
      arrangeHappyPath();

      const result = await resendVerificationEmailService({ email: mockEmail });

      expect(getPendingByEmail).toHaveBeenCalledWith(mockEmail);
      expect(withTransaction).toHaveBeenCalled();
      expect(replacePendingUser).toHaveBeenCalledWith(expect.any(Object), {
        email: mockEmail,
        passwordHash: mockPendingRow.password_hash,
        username: mockPendingRow.username,
      });
      expect(sendVerificationEmail).toHaveBeenCalledWith(mockEmail, 'new-resend-token-uuid');
      expect(result).toEqual({ message: 'Verification email resent successfully.' });
    });

    it('[TC-SRV-RV-002] should throw an error if no pending registration exists for this email', async () => {
      arrangeHappyPath();
      getPendingByEmail.mockResolvedValue(null);

      await expect(resendVerificationEmailService({ email: mockEmail })).rejects.toThrow(
        'No pending registration found for this email. Please register again.'
      );

      expect(replacePendingUser).not.toHaveBeenCalled();
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });
  });

  describe('Test 2 - Security and data-shape invariants', { tags: '@A_R7' }, () => {
    it('[TC-SRV-RV-003] should reuse the password hash and role user exactly as-is', async () => {
      arrangeHappyPath();

      await resendVerificationEmailService({ email: mockEmail });

      expect(replacePendingUser).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          passwordHash: 'existing_password_hash',
        })
      );
    });
  });

  describe('Test 3 - Infrastructure failure handling', { tags: '@A_R8' }, () => {
    it('[TC-SRV-RV-004] should propagate database check failures safely', async () => {
      arrangeHappyPath();
      getPendingByEmail.mockRejectedValue(new Error('PostgreSQL database is down'));

      await expect(resendVerificationEmailService({ email: mockEmail })).rejects.toThrow(
        'PostgreSQL database is down'
      );
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });

    it('[TC-SRV-RV-005] should propagate mailer failures if email delivery fails', async () => {
      arrangeHappyPath();
      sendVerificationEmail.mockRejectedValue(new Error('SMTP Connection timed out'));

      await expect(resendVerificationEmailService({ email: mockEmail })).rejects.toThrow(
        'SMTP Connection timed out'
      );
    });
  });

  describe('Test 4 - Transactional consistency', { tags: '@A_R9' }, () => {
    it('[TC-SRV-RV-006] should roll back and propagate error if replacing pending user fails', async () => {
      arrangeHappyPath();
      withTransaction.mockRejectedValue(new Error('Transaction rolled back: Insert pending failed'));

      await expect(resendVerificationEmailService({ email: mockEmail })).rejects.toThrow(
        'Transaction rolled back: Insert pending failed'
      );
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });
  });
});
