const otpStore = new Map();

export const saveOtp = (email, otp) => {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
    verified: false,
  });

  setTimeout(() => {
    const record = otpStore.get(email);
    if (record?.otp === otp) otpStore.delete(email);
  }, 5 * 60 * 1000);
};

export const getOtp = (email) => otpStore.get(email);

export const markVerified = (email) => {
  const record = otpStore.get(email);
  if (record) otpStore.set(email, { ...record, verified: true });
};

export const deleteOtp = (email) => otpStore.delete(email);
