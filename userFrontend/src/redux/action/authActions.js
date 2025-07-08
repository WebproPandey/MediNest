import { toast } from "react-toastify";
import api from "../../api/api";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
} from "../actionType/userActionType";

// Register
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await api.post("/user/register", userData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.data });
    toast.success("User register successful!");
    navigate("/");
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response?.data?.message || "Register failed" });
     toast.error("Register failed");
  }
};

// Login
export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await api.post("/user/login", userData);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });
     toast.success("Login successful!");
    navigate("/");
  } catch (error) {
    console.log(error)
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data?.message || "Login failed" });
     toast.error("Login failed. Please try again.");
  }
};

// Load user (on refresh)
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });
    const { data } = await api.get("/user/me");
    dispatch({ type: USER_LOAD_SUCCESS, payload: data });
    // console.log(data)
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL });
  }
};

// Logout
export const logoutUser = (navigate) => async (dispatch) => {
  try{
    await api.post("/user/logout");
    dispatch({ type: USER_LOGOUT });
    toast.success("User logout successful!");
    navigate("/");
  }catch(error){

  }

};
