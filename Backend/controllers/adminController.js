const adminService = require("../services/adminService");

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
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Login Admin Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
