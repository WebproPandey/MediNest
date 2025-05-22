const express = require('express');
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require('../../controllers/adminControllers/createCategory');
const validateRequest = require('../../middleware/validateRequest');
const { updateCategorySchema, createCategorySchema } = require('../../validations/adminValidation');
const upload = require('../../middleware/upload');
const router = express.Router();


router.post("/" , upload.single("image") , validateRequest(createCategorySchema), createCategory)
router.put("/:id",upload.single("image") , validateRequest(updateCategorySchema) ,updateCategory);
router.delete("/:id" ,deleteCategory);
router.get("/all" , getAllCategory)



module.exports = router;
