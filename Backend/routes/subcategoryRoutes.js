const express = require('express');
const { createSubcategory, getSubcategoriesByCategory, updateSubcategory, deleteSubcategory } = require('../controllers/subcategoryController');
const router = express.Router();
const upload = require("../middleware/upload")


router.post("/", upload.single("image"), createSubcategory); 
router.put("/:id", upload.array("images"), updateSubcategory);
router.delete("/:id",deleteSubcategory);
router.get("/category/:categoryId", getSubcategoriesByCategory);


module.exports = router;
