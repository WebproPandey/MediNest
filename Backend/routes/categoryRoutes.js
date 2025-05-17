const express = require('express');
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/createCategory');
const router = express.Router();


router.post("/" , createCategory)
router.put("/:id" ,updateCategory);
router.delete("/:id" ,deleteCategory);
router.get("/all" , getAllCategory)



module.exports = router;
