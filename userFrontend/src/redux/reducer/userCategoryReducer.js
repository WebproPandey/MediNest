import {
  USER_CATEGORY_REQUEST,
  USER_CATEGORY_SUCCESS,
  USER_CATEGORY_FAIL,
} from "../actionType/userActionType";

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

export const userCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CATEGORY_REQUEST:
      return { ...state, loading: true };

    case USER_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload, error: null };

    case USER_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
