const express = require('express');
const { createCategory, getAllCategory } = require('../controllers/createCategory');
const router = express.Router();


router.post("/" , createCategory)
router.get("/all" , getAllCategory)



module.exports = router;
