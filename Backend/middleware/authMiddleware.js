const jwt = require("jsonwebtoken");

const protect = (role) => {
  return (req, res, next) => {
    const token = req.cookies.token; // Ensure token is being sent in cookies
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded token:", decoded); // Log decoded token for debugging

      if (role && decoded.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = { id: decoded.id, role: decoded.role }; 
      
      // Ensure req.user.id is set
      next();
    } catch (err) {
      console.log("Invalid token:", err); // Log token error
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = protect;