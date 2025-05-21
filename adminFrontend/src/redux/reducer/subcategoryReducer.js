import {
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAIL,
  CREATE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_SUCCESS,
} from "../actionType/adminAction";

const initialState = {
  subcategories: [],
  loading: false,
  error: null,
};

export const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBCATEGORIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUBCATEGORIES_SUCCESS:
      return { ...state, loading: false, subcategories: action.payload };
    case FETCH_SUBCATEGORIES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_SUBCATEGORY_SUCCESS:
      return { ...state, subcategories: [...state.subcategories, action.payload] };
    case DELETE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        subcategories: state.subcategories.filter((s) => s._id !== action.payload),
      };
    default:
      return state;
  }
};