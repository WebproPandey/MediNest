const subcategoryService = require("../../services/AdminServices/subcategoryService");

exports.createSubcategory = async (req, res) => {
  try {
    const { subcategoryName ,productName , price, stock, description,categoryId } = req.body;
    const fileBuffer = req.file?.buffer;

    const subcategory = await subcategoryService.createSubcategory(
      { subcategoryName, price,  productName ,stock, description,categoryId },
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
    console.log("Requested categoryId:", categoryId);
    
    const subcategories = await subcategoryService.getSubcategoriesByCategory(categoryId);
    consoel.log("subcategories:",subcategories)

    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error("getSubcategoriesByCategory Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.updateSubcategory = async (req, res) => {
  try {
    const { subcategoryName, price, stock, description, categoryId } = req.body;
    const images = req.files; 
    const updated = await subcategoryService.updateSubcategory(
      req.params.id,
      { subcategoryName, price, stock, description, categoryId },
      images
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    await subcategoryService.deleteSubcategory(req.params.id);
    res.status(200).json({ success: true, message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


