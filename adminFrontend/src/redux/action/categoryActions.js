import api from "../../api/apiInstance";
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORIES_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from "../actionType/adminAction";


export const createCategory = (category) => async (dispatch) => {
  dispatch({ type:CREATE_CATEGORY_REQUEST });
  try {
     const { data } = await api.post("/categories", category);
  dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    console.log("createCategory:" ,data)
  } catch (error) {
     dispatch({
          type: CREATE_CATEGORIES_FAIL,
          payload: error.response?.data?.message || error.message,
    });
    console.log("createCategory  error:" ,error.message)
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    const { data } = await  api.get("/categories/all");
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
  
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAIL, payload: error.message });
  }
};

export const updateCategory = (id, updatedCategory) => async (dispatch) => {
  try {
    const { data } = await api.put(`/categories/${id}`, updatedCategory);
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    console.log("updateCategory:", data);
  } catch (error) {
    console.log("updateCategory error:", error.response?.data?.message || error.message);
  }
};


export const deleteCategory = (id) => async (dispatch) => {
  await api.delete(`/categories/${id}`);
  dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
};