const express = require('express');
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require('../../controllers/adminControllers/createCategory');
const validateRequest = require('../../middleware/validateRequest');
const { updateCategorySchema, createCategorySchema } = require('../../validations/adminValidation');
const router = express.Router();


router.post("/" , validateRequest(createCategorySchema), createCategory)
router.put("/:id",validateRequest(updateCategorySchema) ,updateCategory);
router.delete("/:id" ,deleteCategory);
router.get("/all" , getAllCategory)



module.exports = router;
