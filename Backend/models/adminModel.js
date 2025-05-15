const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Admin name is required"],
    trim: true,
    minlength: [3, "Admin name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Admin email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
  },
  superAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });



module.exports = mongoose.model('Admin', adminSchema);
