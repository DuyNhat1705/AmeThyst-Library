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

export function validateNewPassword(newPassword: string, confirmPassword: string): string | null {
  if (newPassword !== confirmPassword) return 'auth.passwords_no_match';
  if (newPassword.length < 8) return 'auth.password_min_length';
  if (!/[A-Z]/.test(newPassword)) return 'auth.password_require_uppercase';
  if (!/[a-z]/.test(newPassword)) return 'auth.password_require_lowercase';
  if (!/[0-9]/.test(newPassword)) return 'auth.password_require_digit';
  if (!/[^A-Za-z0-9]/.test(newPassword)) return 'auth.password_require_special';
  return null;
}

export const validatePassword = validateNewPassword;