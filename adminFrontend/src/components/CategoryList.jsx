import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, deleteCategory } from "../redux/action/categoryActions";
import CategoryForm from "./CategoryForm";
import SubcategoryForm from "./SubcategoryForm";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryCategoryId, setSubcategoryCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
  };

  const clearSelectedCategory = () => {
    setSelectedCategory(null);
  };

  

  return (
    <div className="p-4">
      <CategoryForm
        selectedCategory={selectedCategory}
        clearSelectedCategory={clearSelectedCategory}
      />

      <h2 className="text-xl font-bold my-4">All Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat._id} className="border p-2 rounded">
            <div className="flex justify-between items-center">
              <span>{cat.categoryName}</span>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => dispatch(deleteCategory(cat._id))}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    setSubcategoryCategoryId(
                      subcategoryCategoryId === cat._id ? null : cat._id
                    )
                  }
                >
                  {subcategoryCategoryId === cat._id ? "Hide SubForm" : "Add Subcategory"}
                </button>
                <button
                 className="bg-yellow-500 text-white px-2 py-1 rounded">
                 <Link to={`/dashboard/subcategories/${cat._id}`}>View Subcategories</Link>
                </button>
              </div>
            </div>

            {subcategoryCategoryId === cat._id && (
              <div className="mt-4">
                <SubcategoryForm categoryId={cat._id} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
