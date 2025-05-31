import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAIL,
} from "../actionType/userActionTypee";

const initialState = {
  loading: false,
  order: null,
  error: null,
};

export const buyNowReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case VERIFY_PAYMENT_REQUEST:
      return { ...state, loading: true };

    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };

    case VERIFY_PAYMENT_SUCCESS:
      return { ...state, loading: false, order: action.payload };

    case CREATE_ORDER_FAIL:
    case VERIFY_PAYMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};