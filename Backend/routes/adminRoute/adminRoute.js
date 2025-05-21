const express = require('express');
const { registerAdmin, loginAdmin, logout, getAdminProfile } = require('../../controllers/adminControllers/adminController');
const { registerAdminSchema, loginAdminSchema } = require('../../validations/adminValidation');
const validateRequest = require('../../middleware/validateRequest');
const protect = require('../../middleware/authMiddleware');
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
   passport.authenticate("google", { failureRedirect: "/login", session: false }),
   (req, res) => {
    const token = jwt.sign({ id: req.user._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    //  console.log("Google login success, setting token cookie:", token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure:false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect("http://localhost:5173/dashboard"); 
  }
);


router.post('/register', validateRequest(registerAdminSchema), registerAdmin);
router.post('/login', validateRequest(loginAdminSchema), loginAdmin);
router.post('/logout', protect('admin'), logout);
router.get("/me", protect('admin') ,getAdminProfile);

module.exports = router;
