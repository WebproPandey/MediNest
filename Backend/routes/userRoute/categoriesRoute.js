const express = require('express');
const {  getAllCategories, getProductsByCategory } = require('../../controllers/userController/userController');
const protect = require('../../middleware/authMiddleware');
const router = express.Router();


router.get('/categories' , getAllCategories);
router.get('/categories/:categoryId/products',protect('user') , getProductsByCategory);

module.exports = router;
