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

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
    case USER_LOAD_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LOAD_FAIL:
      return { ...state, loading: false, isAuthenticated: false, user: null };

    case USER_LOGOUT:
      return { ...state, isAuthenticated: false, user: null };

    default:
      return state;
  }
};
