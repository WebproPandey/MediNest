
const categoryService = require ("../../services/AdminServices/categoryService");

exports.createCategory = async (req,res) =>{
      try {
        const result = await categoryService.createCategory(req.body);
        res.status(result.status).json(result);
      } catch (error) {
        console.error("createCategory Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
      }

}

exports.getAllCategory = async (req, res) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(result.status).json(result);
  } catch (error) {
    console.error("getAllCategory Controller Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const image = req.file?.path;

    const updated = await categoryService.updateCategory(req.params.id, categoryName);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
