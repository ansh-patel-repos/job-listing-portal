import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { validateRegistration, validateLogin } from '../utils/validators.js';

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    const validation = validateRegistration({ name, email, password, role });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      role,
      authProvider: 'local',
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message,
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if user has a password (for Google OAuth users)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'This account was registered with Google. Please use Google login.',
      });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        profile: user.profile,
        authProvider: user.authProvider,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    // In JWT-based authentication, logout is typically handled on the client side
    // by removing the token. However, you can optionally implement token blacklisting here.

    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error.message,
    });
  }
};

// Google OAuth Callback
export const googleCallback = async (req, res) => {
  try {
    const { id, email, name, picture } = req.user;

    // Check if user already exists
    let user = await User.findOne({ googleId: id });

    if (!user) {
      // Check if email already exists
      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        // Link Google account to existing user
        existingEmail.googleId = id;
        if (picture) existingEmail.avatar = picture;
        existingEmail.authProvider = 'google';
        await existingEmail.save();
        user = existingEmail;
      } else {
        // Create new user
        user = new User({
          googleId: id,
          email,
          name,
          avatar: picture,
          role: 'job_seeker', // Default role for Google OAuth users
          authProvider: 'google',
          isEmailVerified: true, // Google verified email
        });
        await user.save();
      }
    } else {
      // Update last login
      user.lastLogin = new Date();
      if (picture && !user.avatar) user.avatar = picture;
      await user.save();
    }

    // Generate token
    const token = generateToken(user._id);

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/auth-success?token=${token}&role=${user.role}`);
  } catch (error) {
    console.error('Google callback error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/auth-error?message=${encodeURIComponent(error.message)}`);
  }
};

// Refresh JWT Token
export const refreshToken = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const token = generateToken(req.user._id);

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      token,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error refreshing token',
      error: error.message,
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, location, bio, skills, experience, company, companySize, industry } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update basic info
    if (name) user.name = name;
    if (phone) user.profile.phone = phone;
    if (location) user.profile.location = location;
    if (bio) user.profile.bio = bio;

    // Update based on role
    if (user.role === 'job_seeker') {
      if (skills) user.profile.skills = skills;
      if (experience) user.profile.experience = experience;
    } else if (user.role === 'employer') {
      if (company) user.profile.company = company;
      if (companySize) user.profile.companySize = companySize;
      if (industry) user.profile.industry = industry;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
  googleCallback,
  refreshToken,
  updateProfile,
};
