
const subcategoryService = require("../services/subcategoryService");



exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await subcategoryService.getAllSubcategories();
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};