const express = require('express');
const { registerUser, loginUser, logout, getUserProfile ,searchProducts } = require('../../controllers/userController/userController');
const { registerUserSchema, loginUserSchema } = require('../../validations/userValidation');
const validateRequest = require('../../middleware/validateRequest');
const protect = require('../../middleware/authMiddleware');
const passport = require("passport");
const generateToken = require("../../utils/generateToken");



const router = express.Router();

router.post('/register', validateRequest(registerUserSchema), registerUser);
router.post('/login', validateRequest(loginUserSchema), loginUser);

router.post("/logout", protect('user') , logout)


router.get("/google", passport.authenticate("user-google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("user-google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const token = require("../../utils/generateToken")(req.user._id, "user");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

   const redirectUrl = process.env.USER_ORIGIN || "http://localhost:5173";
    res.redirect(redirectUrl);  }
);

router.get('/me', protect('user'), getUserProfile);
router.get('/products/search', searchProducts);


module.exports = router;
