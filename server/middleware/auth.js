const jwt = require('jsonwebtoken');


const authenticate = async (req, res, next) => {
  try {
    const token = 
      req.cookies['next-auth.session-token'] ||
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    req.user = decoded.user || decoded;

    next();
  } catch (error) {-
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticate;
