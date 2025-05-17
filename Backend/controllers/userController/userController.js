const userService = require("../../services/UserServices/userService");

exports.registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Login User Error:", error);
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





exports.getAllCategories = async (req, res) => {
  try {
    const categories = await userService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await userService.getProductsByCategory(categoryId);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};