const Category = require('../../models/categoryModel');
const { streamUpload } = require('../../config/cloudinary')





exports.createCategory = async ({ categoryName }, imageBuffer) => 
  {

  try {
    const existing = await Category.findOne({ categoryName });
    if (existing) {
      return { status: 400, success: false, message: 'Category already exists' };
    }

    let uploadedImage = null;
    if (imageBuffer) {
      const result = await streamUpload(imageBuffer, "categories");
      uploadedImage = result.secure_url;
    }

    const category = await Category.create({ categoryName, image: uploadedImage });

    return {
      status: 201,
      success: true,
      data: {
        _id: category._id,
        categoryName: category.categoryName,
        image: category.image,
      }
    };
  } catch (error) {
    console.error("Category Creation Error:", error);
    return { status: 500, success: false, message: "Internal Server Error" };
  }
};


exports.updateCategory = async (id, categoryName, imageBuffer) => {
  let imageUrl;

  if (imageBuffer) {
    const result = await streamUpload(imageBuffer, "categories");
    imageUrl = result.secure_url;
  }

  const updated = await Category.findByIdAndUpdate(
    id,
    { 
      ...(categoryName && { categoryName }),
      ...(imageUrl && { image: imageUrl })
    },
    { new: true }
  );

  return updated;
};

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

exports.deleteCategory = async (id) => {
  await Category.findByIdAndDelete(id);
};
