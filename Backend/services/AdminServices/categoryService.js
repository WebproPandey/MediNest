const Category = require('../../models/categoryModel');



exports.createCategory = async ({categoryName}) =>{
      try {
        const existing = await Category.findOne({ categoryName });
        if (existing) {
          return { status: 400, success: false, message: 'Category already exists' };
        }
    
        const category = await Category.create({ categoryName });

        return {
          status: 201,
          success: true,
          data: {
            _id: category._id,
            categoryName: category.categoryName,
          }
        };
      } catch (error) {
        console.error("Category  Error:", error);
        return { status: 500, success: false, message: "Internal Server Error" };
      }

}


exports.getAllCategory = async () => {
  try {
    const categories = await Category.find();
    return {
      status: 200,
      success: true,
      data: categories
    };
  } catch (error) {
    console.error("getAllCategory Service Error:", error);
    return {
      status: 500,
      success: false,
      message: "Failed to fetch categories"
    };
  }
};


exports.updateCategory = async (id, categoryName) => {
  const updated = await Category.findByIdAndUpdate(
    id,
    { categoryName },
    { new: true }
  );
  return updated;
};

exports.deleteCategory = async (id) => {
  await Category.findByIdAndDelete(id);
};
