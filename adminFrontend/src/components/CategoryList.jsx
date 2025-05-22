import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCategories,
  deleteCategory,
} from "../redux/action/categoryActions";
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
      <div className="grid grid-cols-3 gap-2 ">
        {categories.map((cat) => (
          <div key={cat._id} className="border p-2 rounded h-full w-full">
            <div className="flex justify-between items-center h-full flex-col gap-2">
              <div  className="flex flex-col items-center">
               <h1 className="text-2xl  capitalize font-medium">
                {cat.categoryName}
                </h1>  
              <span className="h-[20vh] w-[20vw] bg-red-300">
                {cat.image && (
                  <img
                  src={cat.image}
                  alt="Category"
                  className="w-full h-full inline-block rounded mr-2 object-cover"
                  />
                )}
              </span>
                </div>
              <div className=" grid grid-cols-2 gap-2 ">
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
                  {subcategoryCategoryId === cat._id
                    ? "Hide SubForm"
                    : "Add Subcategory"}
                </button>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                  <Link to={`/dashboard/subcategories/${cat._id}`}>
                    View Subcategories
                  </Link>
                </button>
              </div>
            </div>

            {subcategoryCategoryId === cat._id && (
              <div className="mt-4">
                <SubcategoryForm
                  categoryId={cat._id}
                  onClose={() => setSubcategoryCategoryId(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
