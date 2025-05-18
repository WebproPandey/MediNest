const Admin = require('../../models/adminModel');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async ({ name, email, password }) => {
  try {
    // Check if any admin already exists
    const adminCount = await Admin.countDocuments();

    if (adminCount > 0) {
      return { status: 400, success: false, message: 'An admin already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    return {
      status: 201,
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id, 'admin'),
      }
    };
  } catch (error) {
    console.error("Register Admin Error:", error.message);
    return { status: 500, success: false, message: "Internal Server Error" };
  }
};


exports.loginAdmin = async ({ email, password }) => {
  try {
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return { status: 404, success: false, message: "Admin not found" };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return { status: 401, success: false, message: "Invalid credentials" };
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return {
      status: 200,
      success: true,
      token, // ✅ Return token to controller to set in cookie
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    };
  } catch (error) {
    return { status: 500, success: false, message: "Internal Server Error" };
  }
};
