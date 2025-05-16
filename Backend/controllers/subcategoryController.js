const subcategoryService = require("../services/subcategoryService");

exports.createSubcategory = async (req, res) => {
  try {
    const { subcategoryName, price, stock, description,categoryId } = req.body;
    const fileBuffer = req.file?.buffer;

    const subcategory = await subcategoryService.createSubcategory(
      { subcategoryName, price, stock, description,categoryId },
      fileBuffer
    );

    res.status(201).json({ success: true, data: subcategory });
  } catch (error) {
    console.error("createSubcategory Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await subcategoryService.getSubcategoriesByCategory(categoryId);

    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error("getSubcategoriesByCategory Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await subcategoryService.getAllSubcategories();
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
