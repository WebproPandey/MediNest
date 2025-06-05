import api from "../../api/api";

import {
  USER_CATEGORY_REQUEST,
  USER_CATEGORY_SUCCESS,
  USER_CATEGORY_FAIL,
  PRODUCTS_BY_CATEGORY_REQUEST,
  PRODUCTS_BY_CATEGORY_SUCCESS,
  PRODUCTS_BY_CATEGORY_FAIL
} from "../actionType/userActionType";

export const fetchUserCategories = () => async (dispatch) => {
  try {
    dispatch({ type: USER_CATEGORY_REQUEST });

    const { data } = await api.get("/categories", {
      withCredentials: true,
    });
    // console.log("data:" ,data.data)

    dispatch({ type: USER_CATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    console.log("CategoryError:" ,error)
    dispatch({
      type: USER_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const fetchProductsByCategory = (categoryId) => async (dispatch) => {
    if (!categoryId || categoryId === "undefined") return;
  try {
    dispatch({ type: PRODUCTS_BY_CATEGORY_REQUEST });

    const { data } = await api.get(`/categories/${categoryId}/products`, {
      withCredentials: true,
    });



    dispatch({ type: PRODUCTS_BY_CATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_BY_CATEGORY_FAIL,
      payload:
        error.response?.data?.message || error.message,
    });
  }
};

export const searchProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_BY_CATEGORY_REQUEST });
    const { data } = await api.get(`/user/products/search?keyword=${encodeURIComponent(keyword)}`);
    dispatch({ type: PRODUCTS_BY_CATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_BY_CATEGORY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};