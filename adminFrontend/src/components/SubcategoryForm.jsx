import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSubcategory,
  fetchSubcategories,
} from "../redux/action/subcategoryActions";

const SubcategoryForm = ({ categoryId }) => {
  const dispatch = useDispatch();
  const [subcategoryData, setSubcategoryData] = useState({
    subcategoryName: "",
    productName: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubcategories(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubcategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSubcategoryData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createSubcategory({
        ...subcategoryData,
        categoryId,
      })
    );

    setSubcategoryData({
      subcategoryName: "",
      productName: "",
      price: "",
      stock: "",
      description: "",
      image: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-gray-100 p-4 rounded shadow"
    >
      <input
        type="text"
        name="subcategoryName"
        placeholder="Subcategory Name"
        value={subcategoryData.subcategoryName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={subcategoryData.productName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={subcategoryData.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={subcategoryData.stock}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={subcategoryData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full"
      />

      {subcategoryData.image && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(subcategoryData.image)}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create Subcategory
      </button>
    </form>
  );
};

export default SubcategoryForm;
