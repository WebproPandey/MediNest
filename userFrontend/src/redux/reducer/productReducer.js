import { FETCH_RANDOM_PRODUCTS_FAIL, FETCH_RANDOM_PRODUCTS_REQUEST, FETCH_RANDOM_PRODUCTS_SUCCESS } from "../actionType/userActionType";


const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const randomProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANDOM_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_RANDOM_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload, error: null };
    case FETCH_RANDOM_PRODUCTS_FAIL:
      return { loading: false, products: [], error: action.payload };
    default:
      return state;
  }
};
