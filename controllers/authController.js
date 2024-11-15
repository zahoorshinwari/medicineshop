const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, "jsonwebtoken", { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, "jsonwebtoken", { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get all users
const getUser = async (req, res) => {
  try {
      const users = await User.find({});
      res.status(200).json({ message: "success", data: users });
  } catch (err) {
      res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  register,
  login,
  getUser
}