const userService = require("../../services/UserServices/userService");
const User  =  require("../../models/userModel")

// Register
exports.registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    if (result.success) {
      res.cookie("token", result.data.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      delete result.data.token;
    }
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    if (result.success) {
      res.cookie("token", result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ true in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ 'none' for cross-origin
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      delete result.data.token;
    }
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
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

exports.searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const products = await userService.searchProducts(keyword);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
