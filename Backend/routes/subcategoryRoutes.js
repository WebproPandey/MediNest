const express = require('express');
const { createSubcategory, getSubcategoriesByCategory, getAllSubcategories } = require('../controllers/subcategoryController');
const router = express.Router();
const upload = require("../middleware/upload")


router.post("/", upload.single("image"), createSubcategory); 
router.get("/all", getAllSubcategories);
router.get("/category/:categoryId", getSubcategoriesByCategory);


module.exports = router;
