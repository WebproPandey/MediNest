import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  UPDATE_SHIPPING_REQUEST,
  UPDATE_SHIPPING_SUCCESS,
  UPDATE_SHIPPING_FAIL,
} from "../actionType/adminAction";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { ...state, loading: true };

    case FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case FETCH_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_SHIPPING_REQUEST:
      return { ...state, loading: true };

    case UPDATE_SHIPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };

    case UPDATE_SHIPPING_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};