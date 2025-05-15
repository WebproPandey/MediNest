const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

exports.registerAdmin = async ({ name, email, password }) => {
  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return { status: 400, success: false, message: 'Admin already exists' };
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
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return { status: 404, success: false, message: 'Admin not found' };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return { status: 401, success: false, message: 'Invalid credentials' };
    }

    return {
      status: 200,
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id, 'admin'),
      }
    };
  } catch (error) {
    console.error("Login Admin Error:", error.message);
    return { status: 500, success: false, message: "Internal Server Error" };
  }
};
