const OTP_VERIFY_TTL = 30 * 1000;      // 30s để verify
const OTP_RESET_TTL  = 5 * 60 * 1000;  // 5 phút sau khi verified để nhập password

const otpStore = new Map();

export const saveOtp = (email, otp) => {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + OTP_RESET_TTL,
    verified: false,
  });

  setTimeout(() => {
    const record = otpStore.get(email);
    if (record?.otp === otp && !record.verified) otpStore.delete(email);
  }, OTP_RESET_TTL);
};

export const getOtp = (email) => otpStore.get(email);

export const markVerified = (email) => {
  const record = otpStore.get(email);
  if (record) {
    otpStore.set(email, {
      ...record,
      verified: true,
      expiresAt: Date.now() + OTP_RESET_TTL,
    });

    setTimeout(() => otpStore.delete(email), OTP_RESET_TTL);
  }
};

export const deleteOtp = (email) => otpStore.delete(email);
