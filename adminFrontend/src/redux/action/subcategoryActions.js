import api from "../../api/apiInstance";


import {
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAIL,
  CREATE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_FAIL,
  FETCH_ALL_SUBCATEGORIES_REQUEST,
  FETCH_ALL_SUBCATEGORIES_SUCCESS,
  FETCH_ALL_SUBCATEGORIES_FAIL,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_REQUEST,
} from "../actionType/adminAction";

export const fetchSubcategories = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });
    const { data } = await api.get(`/subcategories/category/${categoryId}`);
    // console.log("data:",data)
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

    const { data } = await api.post("/subcategories", formData ,
     { headers: {
          "Content-Type": "multipart/form-data",
        },}
    ); 
    // console.log("data:" ,data)
    dispatch({ type:CREATE_SUBCATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type:CREATE_SUBCATEGORY_FAIL,
      payload: error.response?.data?.message || "Failed to create subcategory",
    });
  }
};

// UPDATE SUBCATEGORY
export const updateSubcategory = (id, formValues) => async (dispatch) => {
  
  try {
    dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });

    const formData = new FormData();
    formData.append("subcategoryName", formValues.subcategoryName);
    formData.append("productName", formValues.productName);
    formData.append("price",  formValues.price);
    formData.append("stock",  formValues.stock);
    formData.append("description", formValues.description);
    formData.append("categoryId", formValues.categoryId);
    
    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    const { data } = await api.put(`/subcategories/${id}`, formData , 
       { headers: {
          "Content-Type": "multipart/form-data",
        },}
    );
    dispatch({ type: UPDATE_SUBCATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    console.log("update error:" ,error)
    dispatch({
      type: UPDATE_SUBCATEGORY_FAIL,
      payload: error.response?.data?.message || "Update failed",
    });
  }
};

// DELETE SUBCATEGORY
export const deleteSubcategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUBCATEGORY_REQUEST });
    await api.delete(`/subcategories/${id}`);
    dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: id });
  } catch (error) {
    console.error("Delete Error:", error);
  }
};



export const fetchAllSubcategories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_SUBCATEGORIES_REQUEST });

    const { data } = await api.get("/products/all");
    // console.log("data:" ,data)

    dispatch({
      type: FETCH_ALL_SUBCATEGORIES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_SUBCATEGORIES_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};