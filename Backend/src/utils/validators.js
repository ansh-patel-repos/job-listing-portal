// Email validation regex
export const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Password validation - at least 6 characters
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Name validation - at least 2 characters
export const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// Role validation
export const isValidRole = (role) => {
  return ['job_seeker', 'employer'].includes(role);
};

// Validate registration data
export const validateRegistration = (data) => {
  const errors = {};

  if (!isValidName(data.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!isValidPassword(data.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!isValidRole(data.role)) {
    errors.role = 'Invalid role selected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validate login data
export const validateLogin = (data) => {
  const errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidRole,
  validateRegistration,
  validateLogin,
};
