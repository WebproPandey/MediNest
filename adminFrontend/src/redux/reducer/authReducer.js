import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
} from "../actionType/adminAction";

const initialState = {
  admin: null,
  loading: false,
  error: null,
 isAuthenticated: true,

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
    case ADMIN_REGISTER_REQUEST:
      return { ...state, loading: true ,isAuthenticated:false};

    case ADMIN_LOGIN_SUCCESS:
    case ADMIN_REGISTER_SUCCESS:
      return { ...state, loading: false, admin: action.payload ,isAuthenticated: true,
};

    case ADMIN_LOGIN_FAIL:
    case ADMIN_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload ,isAuthenticated:false,};

    case ADMIN_LOGOUT:
      return { ...state, admin: null ,isAuthenticated:false};

    default:
      return state;
  }
};

export default authReducer;


