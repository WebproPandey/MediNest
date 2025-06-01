import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAIL,
} from "../actionType/userActionType";

const initialState = {
  loading: false,
  addresses: [],
  error: null,
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS_REQUEST:
    case FETCH_ADDRESSES_REQUEST:
      return { ...state, loading: true };

    case ADD_ADDRESS_SUCCESS:
      return { ...state, loading: false, addresses: [...state.addresses, action.payload] };

    case FETCH_ADDRESSES_SUCCESS:
      return { ...state, loading: false, addresses: action.payload };

    case ADD_ADDRESS_FAIL:
    case FETCH_ADDRESSES_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};