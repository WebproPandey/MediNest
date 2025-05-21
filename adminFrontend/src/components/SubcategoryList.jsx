import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubcategories } from '../redux/action/subcategoryActions';

const SubcategoryList = () => {
  const dispatch = useDispatch();
  const { subcategories } = useSelector((state) => state.subcategory);
  console.log(subcategories)

  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Subcategories</h2>
      {subcategories.map((sub) => (
        <div key={sub._id} className="border p-2 rounded mb-2">
          <h3 className="font-semibold">{sub.name}</h3>
          <p>Category: {sub.category.name}</p>
          <p>Price: ₹{sub.price}</p>
          <p>Stock: {sub.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default SubcategoryList;
