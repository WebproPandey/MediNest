import {
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  CREATE_SUBCATEGORY_SUCCESS,
  FETCH_SUBCATEGORIES_FAIL,
} from "../actionType/adminAction";

const initialState = {
  subcategories: [],
  loading: false,
  error: null,
};

export const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBCATEGORIES_REQUEST:
    case UPDATE_SUBCATEGORY_REQUEST:
    case DELETE_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };

    case FETCH_SUBCATEGORIES_SUCCESS:
      return { ...state, loading: false, subcategories: action.payload };

    case CREATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: [...state.subcategories, action.payload],
      };

    case UPDATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: state.subcategories.map((sub) =>
          sub._id === action.payload._id ? action.payload : sub
        ),
      };

    case DELETE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: state.subcategories.filter(
          (sub) => sub._id !== action.payload
        ),
      };

    case FETCH_SUBCATEGORIES_FAIL:
    case UPDATE_SUBCATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
