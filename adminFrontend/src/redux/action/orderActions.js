import api from "../../api/apiInstance";
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  UPDATE_SHIPPING_REQUEST,
  UPDATE_SHIPPING_SUCCESS,
  UPDATE_SHIPPING_FAIL,
} from "../actionType/adminAction";

export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDERS_REQUEST });

    const { data } = await api.get("/admin/orders");
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data.data });
    console.log("data,",data)
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateShippingStatus = (orderId, shippingStatus, estimatedDelivery) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SHIPPING_REQUEST });

    const { data } = await api.patch(`/admin/update-shipping/${orderId}`, {
      shippingStatus,
      estimatedDelivery,
    });
    dispatch({ type: UPDATE_SHIPPING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SHIPPING_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};