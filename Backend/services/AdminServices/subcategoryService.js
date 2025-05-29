const Subcategory = require("../../models/subcategoryModel");
const Product = require("../../models/productModel");
const { streamUpload } = require("../../config/cloudinary");
const mongoose = require("mongoose")


exports.createSubcategory = async ({ subcategoryName,productName ,price, stock, description, categoryId }, fileBuffer) => {
  let imageUrl = null;

  if (fileBuffer) {
    const result = await streamUpload(fileBuffer, "subcategories");
    imageUrl = result.secure_url;
  }
  const subcategory = await Subcategory.create({
    subcategoryName,
    productName,
    price,
    stock,
    description,
    category: categoryId,
    image: imageUrl
  });

  return subcategory;
};

exports.getSubcategoriesByCategory = async (categoryId) => {
  const subcategories = await Subcategory.find({ category: categoryId  }).populate("category");;
  return subcategories;
};

exports.getAllSubcategories = async () => {
  return await Subcategory.find().populate('category');
}



exports.updateSubcategory = async (id, data) => {

   const updatedSubcategory = await Subcategory.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
  return updatedSubcategory;
};

exports.deleteSubcategory = async (id) => {
  await Subcategory.findByIdAndDelete(id);
};



exports.getRandomProducts = async (limit) => {
  return await Subcategory.aggregate([
    { $sample: { size: limit } }
  ]);
};


