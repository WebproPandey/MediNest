import api from "../../api/api";
import { FETCH_RANDOM_PRODUCTS_FAIL, FETCH_RANDOM_PRODUCTS_REQUEST, FETCH_RANDOM_PRODUCTS_SUCCESS } from "../actionType/userActionType";


export const fetchRandomProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RANDOM_PRODUCTS_REQUEST });

    const { data } = await api.get("/products/random");
    dispatch({
      type: FETCH_RANDOM_PRODUCTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log("Error product",error)
    dispatch({
      type: FETCH_RANDOM_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};
