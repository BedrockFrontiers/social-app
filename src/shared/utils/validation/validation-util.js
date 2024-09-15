export const PASSWORD_MIN_LENGTH = 6;
export const USERNAME_MIN_LENGTH = 2;

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPassword(password) {
  return password.trim().length >= PASSWORD_MIN_LENGTH;
}

export function isValidUsername(username) {
  return username.trim().length >= USERNAME_MIN_LENGTH;
}