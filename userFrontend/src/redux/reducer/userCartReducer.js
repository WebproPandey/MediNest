import {
  ADD_TO_CART,
  SET_SELECTED_PRODUCT,
  REMOVE_FROM_CART,
} from "../actionType/userActionType";

const initialState = {
  selectedProduct: null,
  cart: [],
  watchlist: [],
  totalAmount: 0,
};

const userCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
case ADD_TO_CART: {
  const existingItemIndex = state.cart.findIndex(
    (item) => item._id === action.payload._id
  );
  

  const updatedCart = [...state.cart];

  if (existingItemIndex >= 0) {
    updatedCart[existingItemIndex] = {
      ...updatedCart[existingItemIndex],
      quantity: action.payload.quantity, // Update quantity
      totalPrice: action.payload.price * action.payload.quantity, // Update total price
    };
  } else {
    updatedCart.push({
      ...action.payload,
      totalPrice: action.payload.price * action.payload.quantity,
    });
  }

  const totalAmount = updatedCart.reduce((acc, item) => acc + item.totalPrice, 0);

  return { ...state, cart: updatedCart, totalAmount };
}
    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload
      );

      const totalAmount = updatedCart.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      return { ...state, cart: updatedCart, totalAmount };
    }

    default:
      return state;
  }
};

export default userCartReducer;
