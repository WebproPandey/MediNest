import api from "../../api/apiInstance";
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT } from "../actionType/adminAction";


export const loginAdmin = (email ,password ,navigate) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const { data } = await api.post("/admin/login", {email,password});
    console.log("Login success:", data);
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data.data  });
  if (data.success) {
      navigate("/dashboard");
    }  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logoutAdmin = () => async (dispatch) => {
  await api.post("/logout");
  dispatch({ type: ADMIN_LOGOUT });
};
