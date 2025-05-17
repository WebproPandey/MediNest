const express = require('express');
const { getAllSubcategories } = require('../controllers/productControler');
const router = express.Router();


router.get("/all", getAllSubcategories);

module.exports = router;
