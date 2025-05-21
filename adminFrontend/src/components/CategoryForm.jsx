import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory, updateCategory } from "../redux/action/categoryActions";

const CategoryForm = ({ selectedCategory, clearSelectedCategory }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  // When selectedCategory changes (from edit), update input
  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.categoryName);
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    if (selectedCategory) {
      // If we're editing
      dispatch(updateCategory(selectedCategory._id, { categoryName }));
      clearSelectedCategory(); // clear after update
    } else {
      // If we're creating
      dispatch(createCategory({ categoryName }));
    }

    setCategoryName(""); // reset input
  };

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">{selectedCategory ? "Update" : "Add"} Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {selectedCategory ? "Update" : "Add"} Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
