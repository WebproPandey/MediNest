import api from "../../api/api";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAIL,
} from "../actionType/userActionType";

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const { data } = await api.post("/buy-now/create-order", orderData);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    console.log("createorder:" ,data)
    return data;
  } catch (error) {
    console.log("error:",error)
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response?.data?.message || "Failed to create order",
    });
  }
};

export const verifyPayment = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_PAYMENT_REQUEST });
    const { data } = await api.post("/buy-now/verify-payment", paymentData);
    dispatch({ type: VERIFY_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VERIFY_PAYMENT_FAIL,
      payload: error.response?.data?.message || "Failed to verify payment",
    });
  }
};