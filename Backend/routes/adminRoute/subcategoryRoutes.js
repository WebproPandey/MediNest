const express = require('express');
const { createSubcategory, getSubcategoriesByCategory, updateSubcategory, deleteSubcategory } = require('../../controllers/adminControllers/subcategoryController');
const router = express.Router();
const upload = require("../../middleware/upload");
const validateRequest = require('../../middleware/validateRequest');
const { createSubcategorySchema, updateSubcategorySchema } = require('../../validations/adminValidation');


router.post("/", upload.single("image"),validateRequest(createSubcategorySchema), createSubcategory); 
router.put("/:id", upload.single("image"), validateRequest(updateSubcategorySchema), updateSubcategory);
router.delete("/:id",deleteSubcategory);
router.get("/category/:categoryId", getSubcategoriesByCategory);


module.exports = router;
