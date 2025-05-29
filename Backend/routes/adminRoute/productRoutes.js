const express = require('express');
const { getAllSubcategories ,getRandomProducts } = require('../../controllers/adminControllers/productControler');
const router = express.Router();


router.get("/all", getAllSubcategories);
router.get("/random", getRandomProducts);

module.exports = router;
