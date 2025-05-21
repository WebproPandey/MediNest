import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSubcategory,
  fetchSubcategories,
  updateSubcategory,
} from "../redux/action/subcategoryActions";

const SubcategoryForm = ({ categoryId, initialData = null, onSuccess ,editMode, onClose }) => {
  const dispatch = useDispatch();
  const [subcategoryData, setSubcategoryData] = useState({
    subcategoryName: "",
    productName: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setSubcategoryData({
        subcategoryName: initialData.subcategoryName || "",
        productName: initialData.productName || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        description: initialData.description || "",
        image: null,
      });
      setExistingImage(initialData.image || "");
    }
  }, [initialData]);

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
    setExistingImage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert string values to numbers where needed
    const processedData = {
      ...subcategoryData,
      price: Number(subcategoryData.price),
      stock: Number(subcategoryData.stock),
      categoryId,
    };

    if (editMode &&  initialData) {
      dispatch(updateSubcategory(initialData._id, processedData)).then(() => {
        if (onSuccess) onSuccess();
      });
    } else {
      dispatch(createSubcategory(processedData)).then(() => {
        dispatch(fetchSubcategories(categoryId));
        if (onSuccess) onSuccess();
        
      });
    }
    onClose();


    setSubcategoryData({
      subcategoryName: "",
      productName: "",
      price: "",
      stock: "",
      description: "",
      image: null,
    });
    setExistingImage("");
  };

  return (
     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-[500px] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="text-xl font-bold mb-4">
          {editMode ? "Edit Subcategory" : "Add Subcategory"}
        </h2>
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
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={subcategoryData.productName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={subcategoryData.price}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={subcategoryData.stock}
        onChange={handleChange}
        required
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
      {(subcategoryData.image || existingImage) && (
        <div className="mt-2">
          <img
            src={
              subcategoryData.image
                ? URL.createObjectURL(subcategoryData.image)
                : existingImage
            }
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className={`${
          initialData ? "bg-blue-600" : "bg-green-600"
        } text-white px-4 py-2 rounded`}
      >
        {initialData ? "Update Subcategory" : "Create Subcategory"}
      </button>
    </form>
    </div>
    </div>
  );
};

export default SubcategoryForm;
