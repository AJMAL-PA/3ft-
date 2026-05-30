const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken({ email: adminEmail, role: 'admin' });

    res.json({
      success: true,
      token,
      admin: { email: adminEmail, role: 'admin' },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// @desc    Verify Token
// @route   GET /api/auth/verify
// @access  Protected
const verify = (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
};

// @desc    Logout (client handles token deletion — this just confirms)
// @route   POST /api/auth/logout
// @access  Protected
const logout = (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = { login, verify, logout };
