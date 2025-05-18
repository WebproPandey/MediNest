const adminService = require("../../services/AdminServices/adminService");
const Admin = require("../../models/adminModel");
const jwt = require("jsonwebtoken"); 



exports.registerAdmin = async (req, res) => {
  try {
    const result = await adminService.registerAdmin(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Register Admin Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const result = await adminService.loginAdmin(req.body);

    if (result.success) {
      // ✅ Set token in cookie here
      res.cookie("token", result.token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production", // <-- ADD THIS LINE

      });
    }

    res.status(result.status).json(result);
  } catch (error) {
    console.error("Login Admin Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.getAdminProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(401).json({ success: false, message: "Not authorized" });
  }
}

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
     maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};