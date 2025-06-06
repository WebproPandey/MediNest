const jwt = require("jsonwebtoken");

const protect = (role) => (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


  if (!token) {
    console.log("Token not found");
    return res.status(401).json({ message: "Unauthorized: Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (role && decoded.role !== role) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = protect;