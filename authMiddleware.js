// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming the User model is in the models folder

// Protect middleware to verify JWT token
const protect = async (req, res, next) => {
  let token;

  // Check if the request contains a token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user from the decoded JWT and attach it to the request
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password field

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports =  protect ;
