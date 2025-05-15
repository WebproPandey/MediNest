const express = require('express');
const { registerAdmin, loginAdmin, logout } = require('../controllers/adminController');
const { registerAdminSchema, loginAdminSchema } = require('../validations/adminValidation');
const validateRequest = require('../middleware/validateRequest');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateRequest(registerAdminSchema), registerAdmin);
router.post('/login', validateRequest(loginAdminSchema), loginAdmin);
router.post('/logout', protect('admin'), logout);

module.exports = router;
