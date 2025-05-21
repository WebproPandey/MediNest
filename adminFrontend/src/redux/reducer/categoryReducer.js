import { CREATE_CATEGORIES_FAIL, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS, FETCH_CATEGORIES_FAIL, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, UPDATE_CATEGORY_SUCCESS } from "../actionType/adminAction";

const initialState = {
  categories: [], // categories is an array
  loading: false,
  error: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.data, // set only the array
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload.data], // push new one
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter((cat) => cat._id !== action.payload),
      };

    
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat._id === action.payload.data._id ? action.payload.data : cat
        ),
      };  

    case FETCH_CATEGORIES_FAIL:
    case CREATE_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
