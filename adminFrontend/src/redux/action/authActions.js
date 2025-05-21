import api from "../../api/apiInstance";
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, ADMIN_REGISTER_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS } from "../actionType/adminAction";



export const registerAdmin = (name, email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REGISTER_REQUEST });

    const { data } = await api.post("/admin/register", { name, email, password });
    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data.data });

    if (data.success) {
      navigate("/dashboard");
    }
  } catch (error) {
    dispatch({
      type: ADMIN_REGISTER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    navigate("/login");
  }
};

export const loginAdmin = (email ,password ,navigate) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const { data } = await api.post("/admin/login", {email,password});
    // console.log("Login success:", data);
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data.data  });
  if (data.success) {
      navigate("/dashboard");
    }
   } catch (error) {
    console.log("Login Error:" , error)
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const { data } = await api.get("/admin/me");
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data.data });

  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logoutAdmin = () => async (dispatch) => {
  await api.post("/admin/logout");
  dispatch({ type: ADMIN_LOGOUT });
};