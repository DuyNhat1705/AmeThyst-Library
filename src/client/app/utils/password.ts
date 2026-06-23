// Tính độ mạnh password (0-4)
export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
}

// Validate password match + độ dài — trả về i18n key hoặc null
export function validateNewPassword(newPassword: string, confirmPassword: string): string | null {
  if (newPassword !== confirmPassword) return 'auth.passwords_no_match';
  if (newPassword.length < 8) return 'auth.password_min_length';
  return null;
}

export const validatePassword = validateNewPassword;