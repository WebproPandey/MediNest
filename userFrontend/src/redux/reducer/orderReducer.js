import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "../actionType/userActionType";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const userOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case FETCH_USER_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CANCEL_ORDER_REQUEST:
      return { ...state, loading: true };
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    case CANCEL_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};