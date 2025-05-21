import api from "../../api/apiInstance";


import {
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAIL,
  CREATE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_FAIL,
} from "../actionType/adminAction";

export const fetchSubcategories = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });
    const { data } = await api.get(`/subcategories/category/${categoryId}`);
    console.log("data:",data)
    dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: data.data });
  } catch (error) {
    console.log("SUBCATEGORIEFAIL:",error)
    dispatch({ type: FETCH_SUBCATEGORIES_FAIL, payload: error.message });
  }
};


export const createSubcategory = (formValues) => async (dispatch) => {
  try {
      dispatch({ type: CREATE_SUBCATEGORY_REQUEST });
    const formData = new FormData();
    formData.append("subcategoryName", formValues.subcategoryName);
    formData.append("productName", formValues.productName);
    formData.append("price", formValues.price);
    formData.append("stock", formValues.stock);
    formData.append("description", formValues.description);
    formData.append("categoryId", formValues.categoryId);

    if (formValues.image) {
      formData.append("image", formValues.image); 
    }

    const { data } = await api.post("/subcategories", formData); 
    console.log("data:" ,data)
    dispatch({ type:CREATE_SUBCATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type:CREATE_SUBCATEGORY_FAIL,
      payload: error.response?.data?.message || "Failed to create subcategory",
    });
  }
};

export const deleteSubcategory = (id) => async (dispatch) => {
  await api.delete(`/subcategories/${id}`);
  dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: id });
};