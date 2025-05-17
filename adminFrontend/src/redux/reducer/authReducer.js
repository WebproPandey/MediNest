import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT } from "../actionType/adminAction";


const initialState = {
  admin: null,
  loading: false,
  error: null,
  isAuthenticated: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case ADMIN_LOGIN_SUCCESS:
      return { ...state, loading: false, admin: action.payload ,isAuthenticated: true,};
    case ADMIN_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return { admin: null, loading: false, error: null };
    default:
      return state;
  }
};
