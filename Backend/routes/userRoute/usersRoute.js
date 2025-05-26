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


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const token = generateToken(req.user._id, 'user');
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    res.redirect("http://localhost:5174/user/home");
  }
);

router.get('/me', protect('user'), getUserProfile);
router.get('/products/search', searchProducts);
// router.get('/categories',protect('user') , getAllCategories);
// router.get('/categories/:categoryId/products',protect('user') , getProductsByCategory);
module.exports = router;
