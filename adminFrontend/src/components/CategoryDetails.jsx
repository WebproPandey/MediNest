import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSubcategory, fetchSubcategories } from "../redux/action/subcategoryActions";
import SubcategoryForm from "./SubcategoryForm";

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate()
  const { id: categoryId } = useParams();

  const { subcategories, loading, error } = useSelector(
    (state) => state.subcategories
  );
  // console.log("subcategories:", subcategories);
  const [editSubcategory, setEditSubcategory] = useState(null);

  const handleEdit = (sub) => {
    setEditSubcategory(sub);
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubcategories(categoryId));
    }
  }, [categoryId]);

  return (
    <div className="p-4">
      <div>
       <h2 className="text-xl font-bold mb-4">Subcategory Products</h2>
        <button onClick={() =>  navigate(-1)}> Back  </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : subcategories.length === 0 ? (
        <p>No subcategory products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subcategories?.map((sub) => (
            <div key={sub._id} className="border p-4 rounded-lg shadow">
              <img
                src={sub.image}
                alt={sub.productName}
                className="h-32 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold">{sub.productName}</h3>
              <p className="text-black  line-clamp-2 ">{sub.description}</p>
              <p>Stock: {sub.stock}</p>
              <p className="font-bold">Price: ₹{sub.price}</p>
              <div>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(sub)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => dispatch(deleteSubcategory(sub._id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {editSubcategory && (
            <SubcategoryForm
              categoryId={categoryId}
              initialData={editSubcategory}
              editMode={true}
              onClose={() => setEditSubcategory(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
