import {
  PRODUCTS_BY_CATEGORY_REQUEST,
  PRODUCTS_BY_CATEGORY_SUCCESS,
  PRODUCTS_BY_CATEGORY_FAIL,
} from  "../actionType/userActionType";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const productsByCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_BY_CATEGORY_REQUEST:
      return { ...state, loading: true };

    case PRODUCTS_BY_CATEGORY_SUCCESS:
      return { loading: false, products: action.payload, error: null };

    case PRODUCTS_BY_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
