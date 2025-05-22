import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory, updateCategory } from "../redux/action/categoryActions";

const CategoryForm = ({ selectedCategory, clearSelectedCategory }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null); 

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.categoryName);
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    if (image) formData.append("image", image);

    if (selectedCategory) {
      dispatch(updateCategory(selectedCategory._id, formData));
      clearSelectedCategory();
    } else {
      dispatch(createCategory(formData));
    }

    setCategoryName("");
    setImage(null);
  };

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">{selectedCategory ? "Update" : "Add"} Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {selectedCategory ? "Update" : "Add"} Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
