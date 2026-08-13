import { beforeEach, describe, expect, it, vi } from 'vitest';
import { validateRegistration } from '../../src/middlewares/auth-validation.middleware.mjs';
import { verifyCsrf } from '../../src/middlewares/security.middleware.mjs';
import { generateOtp, hashOtp, validateOtpRecord } from '../../src/utils/otpHelpers.mjs';

const response = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
});

describe('authentication security hardening', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-hmac';
  });

  it('generates a six-digit cryptographic OTP and validates only its hash', () => {
    const email = 'reader@example.com';
    const otp = generateOtp();
    expect(otp).toMatch(/^\d{6}$/);
    const row = {
      otp_hash: hashOtp(email, otp),
      expired_at: new Date(Date.now() + 60_000),
      attempt_count: 0,
    };
    expect(() => validateOtpRecord(row, email, otp)).not.toThrow();
    expect(() => validateOtpRecord(row, email, '000000')).toThrow('Incorrect OTP');
  });

  it('rejects an OTP after the attempt cap', () => {
    expect(() => validateOtpRecord({
      otp_hash: hashOtp('reader@example.com', '123456'),
      expired_at: new Date(Date.now() + 60_000),
      attempt_count: 5,
    }, 'reader@example.com', '123456')).toThrow('OTP attempt limit exceeded');
  });

  it('normalizes valid registration data and rejects weak passwords', () => {
    const next = vi.fn();
    const valid = { body: { email: ' Reader@Example.COM ', username: ' Reader ', password: 'Strong123' } };
    validateRegistration(valid, response(), next);
    expect(next).toHaveBeenCalledOnce();
    expect(valid.body).toMatchObject({ email: 'reader@example.com', username: 'Reader' });

    const res = response();
    validateRegistration({ body: { email: 'reader@example.com', username: 'Reader', password: 'weak' } }, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('requires a matching double-submit token for cookie-authenticated mutations', () => {
    const next = vi.fn();
    const req = {
      method: 'POST',
      cookies: { amethyst_access: 'access', amethyst_csrf: 'csrf-value' },
      get: vi.fn().mockReturnValue('csrf-value'),
    };
    verifyCsrf(req, response(), next);
    expect(next).toHaveBeenCalledOnce();

    const res = response();
    verifyCsrf({ ...req, get: vi.fn().mockReturnValue('wrong') }, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(403);
  });
});
