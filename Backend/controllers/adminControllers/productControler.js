
const subcategoryService = require("../../services/AdminServices/subcategoryService");





exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await subcategoryService.getAllSubcategories();
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getRandomProducts = async (req, res) => {
  try {
    const products = await subcategoryService.getRandomProducts(15);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


