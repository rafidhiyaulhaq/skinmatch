const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists with email or username
    const existingUser = await User.findOne({ 
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username sudah digunakan' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Tambahkan fungsi baru untuk profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;

    // Cek user exists
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Jika ada update password
    if (currentPassword && newPassword) {
      // Verifikasi password lama
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Password saat ini tidak valid' });
      }

      // Hash password baru
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Update data lain
    if (username) user.username = username;
    if (email) {
      // Cek email sudah dipakai atau belum
      const existingUser = await User.findOne({ email, _id: { $ne: req.userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah digunakan' });
      }
      user.email = email;
    }

    await user.save();

    // Return user tanpa password
    const updatedUser = await User.findById(req.userId).select('-password');
    res.json(updatedUser);

  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};