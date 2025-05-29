import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, UPDATE_TOTAL_AMOUNT, UPDATE_WATCHLIST_QUANTITY } from "../actionType/userActionType";

const initialState = {
  watchlist: [],
  totalAmount: 0,
};

export  const userWatchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      const exists = state.watchlist.find((item) => item._id === action.payload._id);
      if (exists) return state;
      return {
        ...state,
        watchlist: [...state.watchlist, { ...action.payload, quantity: 1 }],
      };

    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter((item) => item._id !== action.payload),
      };

    case UPDATE_WATCHLIST_QUANTITY:
      return {
        ...state,
        watchlist: state.watchlist.map((item) =>
          item._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case UPDATE_TOTAL_AMOUNT:
      const total = state.watchlist.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return {
        ...state,
        totalAmount: total,
      };

    default:
      return state;
  }
};

