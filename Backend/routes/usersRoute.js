const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/userController');
const { registerUserSchema, loginUserSchema } = require('../validations/userValidation');
const validateRequest = require('../middleware/validateRequest');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateRequest(registerUserSchema), registerUser);
router.post('/login', validateRequest(loginUserSchema), loginUser);

router.post("/logout", protect('user') , logout)

module.exports = router;
