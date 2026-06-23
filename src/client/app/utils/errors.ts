const SERVER_ERROR_MAP: Record<string, string> = {
  'Email does not exist': 'auth.email_not_exist',
  'Invalid OTP': 'auth.otp_incorrect',
  'OTP has expired': 'auth.otp_expired',
  'Incorrect OTP': 'auth.otp_incorrect',
  'OTP not verified': 'auth.otp_incorrect',
  'Password reset failed': 'auth.password_reset_failed',
  'Email already exists': 'auth.email_already_exists',
  'Invalid email or password': 'auth.invalid_email_password',
  'User not found': 'auth.user_not_found',
  'Google accounts cannot change password here': 'auth.google_linked_change_password_error',
  'Invalid password': 'auth.invalid_credentials',
  'Password is incorrect': 'auth.invalid_credentials',
  'Current password is incorrect': 'auth.invalid_credentials',
  'Passwords do not match': 'auth.passwords_no_match',
  'New password must be at least 8 characters': 'auth.password_min_length',
  'Password must be at least 8 characters': 'auth.password_min_length',
};

export function mapServerError(rawMsg: string | null | undefined, t: (key: string) => string, fallbackKey?: string): string {
  if (!rawMsg) return fallbackKey ? t(fallbackKey) : '';
  
  // Find match in our map
  const translationKey = SERVER_ERROR_MAP[rawMsg];
  if (translationKey) {
    return t(translationKey);
  }
  
  // Fallback to translation key directly if it looks like one, otherwise return the raw error or translated fallback
  if (rawMsg.startsWith('auth.') || rawMsg.startsWith('profile.')) {
    return t(rawMsg);
  }
  
  return rawMsg;
}