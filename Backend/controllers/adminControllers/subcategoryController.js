const subcategoryService = require("../../services/AdminServices/subcategoryService");
const { streamUpload } = require("../../config/cloudinary");


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
    // console.log("Requested categoryId:", categoryId);
    
    const subcategories = await subcategoryService.getSubcategoriesByCategory(categoryId);
    // console.log("subcategories:",subcategories)

    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error("getSubcategoriesByCategory Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.updateSubcategory = async (req, res) => {
  try {
    const { subcategoryName, productName ,price, stock, description, categoryId } = req.body;
    const file = req.file; // <-- single file
    const updateData = { subcategoryName, productName, price, stock, description, categoryId };
    if (file) {
      const result = await streamUpload(file.buffer, "subcategories");
      updateData.image = result.secure_url;
    }
    const updated = await subcategoryService.updateSubcategory(
      req.params.id,
      updateData
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


