const User = require('../../models/userModel');
const Category = require('../../models/categoryModel');
const Subcategory = require('../../models/subcategoryModel');


const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');


exports.registerUser = async ({ name, email, password }) => {
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return { status: 400, success: false, message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return {
      status: 201,
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id, 'user'),
      }
    };
  } catch (error) {
    console.error("Register User Error:", error.message);
    return { status: 500, success: false, message: "Internal Server Error" };
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return { status: 404, success: false, message: 'User not found' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, success: false, message: 'Invalid credentials' };
    }

    return {
      status: 200,
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id, 'user'),
      }
    };
  } catch (error) {
    console.error("Login User Error:", error.message);
    return { status: 500, success: false, message: "Internal Server Error" };
  }
};



exports.getAllCategories = async () => {
  return await Category.find();
};

exports.getProductsByCategory = async (categoryId) => {
  return await Subcategory.find({ category: categoryId });
};
