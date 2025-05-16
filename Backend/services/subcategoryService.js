const Subcategory = require("../models/subcategoryModel");
const { streamUpload } = require("../config/cloudinary");

exports.createSubcategory = async ({ subcategoryName, price, stock, description, categoryId }, fileBuffer) => {
  let imageUrl = null;

  if (fileBuffer) {
    const result = await streamUpload(fileBuffer, "subcategories");
    imageUrl = result.secure_url;
  }

  const subcategory = await Subcategory.create({
    subcategoryName,
    price,
    stock,
    description,
    category: categoryId,
    image: imageUrl
  });

  return subcategory;
};

exports.getSubcategoriesByCategory = async (categoryId) => {
  const subcategories = await Subcategory.find({ category: categoryId });
  return subcategories;
};

exports.getAllSubcategories = async () => {
  return await Subcategory.find().populate('category');
}
