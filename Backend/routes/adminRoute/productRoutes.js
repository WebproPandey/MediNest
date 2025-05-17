const express = require('express');
const { getAllSubcategories } = require('../../controllers/adminControllers/productControler');
const router = express.Router();


router.get("/all", getAllSubcategories);

module.exports = router;
