export const OTP_VERIFY_TTL = 60 * 1000;      // 60 giây để nhập OTP
export const OTP_RESET_TTL  = 5 * 60 * 1000;  // 5 phút sau verify để nhập password mới

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Validate OTP row từ DB — throw nếu invalid/expired/sai OTP
export const validateOtpRecord = (row, otp) => {
  if (!row) throw new Error('Invalid OTP');
  if (new Date() > new Date(row.expired_at)) throw new Error('OTP has expired');
  if (row.otp !== otp) throw new Error('Incorrect OTP');
};

// Validate trạng thái verified — dùng trước khi cho phép reset password
export const validateVerifiedRecord = (row) => {
  if (!row || !row.verified) throw new Error('OTP not verified');
  if (new Date() > new Date(row.expired_at)) throw new Error('OTP session has expired. Please request a new OTP.');
};
