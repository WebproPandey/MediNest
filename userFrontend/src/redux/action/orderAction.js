import { toast } from "react-toastify";
import api from "../../api/api";
import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
   CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "../actionType/userActionType";

export const fetchUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_ORDERS_REQUEST });
    const { data } = await api.get("/buy-now/my-orders");
    dispatch({ type: FETCH_USER_ORDERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ORDERS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch orders",
    });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    await api.delete(`/buy-now/cancel-order/${orderId}`);
    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: orderId });
     toast.success("cancel order");
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_FAIL,
      payload: error.response?.data?.message || "Failed to cancel order",
    });
    toast.error("Failed to cancel order");

  }
};