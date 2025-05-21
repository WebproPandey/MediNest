import { FETCH_ALL_SUBCATEGORIES_FAIL, FETCH_ALL_SUBCATEGORIES_REQUEST, FETCH_ALL_SUBCATEGORIES_SUCCESS } from "../actionType/adminAction";


const initialState = {
  allproducts: [],
  loading: false,
  error: null,
};

export const allSubcategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SUBCATEGORIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALL_SUBCATEGORIES_SUCCESS:
      return { loading: false, allproducts: action.payload, error: null };
    case FETCH_ALL_SUBCATEGORIES_FAIL:
      return { loading: false, allproducts: [], error: action.payload };
    default:
      return state;
  }
};
