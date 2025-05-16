
const categoryService = require ("../services/categoryService");

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