import { toast } from "react-toastify";
import api from "../../api/api";
import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAIL,
} from "../actionType/userActionType";

export const addAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ADDRESS_REQUEST });
    const { data } = await api.post("/address/add", addressData);
    dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data.address });
    toast.success("Create Address successful");
  } catch (error) {
    dispatch({
      type: ADD_ADDRESS_FAIL,
      payload: error.response?.data?.message || "Failed to add address",
    });
    toast.error("Failed to add address");
  }
};



export const fetchAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ADDRESSES_REQUEST });
    const { data } = await api.get("/address/list", { withCredentials: true }); 
    dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: data.addresses });
  } catch (error) {
    dispatch({
      type: FETCH_ADDRESSES_FAIL,
      payload: error.response?.data?.message || "Failed to fetch addresses",
    });
  }
};