const jwt = require('jsonwebtoken');

const protect = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== role) return res.status(403).json({ message: 'Access denied' });

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token failed' });
    }
  };
};

module.exports = protect;
