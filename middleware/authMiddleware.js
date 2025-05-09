import jwt, { decode } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token);

      //verify the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      //get user from the token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error('Auth error:', error); // ✅ Log the error
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
