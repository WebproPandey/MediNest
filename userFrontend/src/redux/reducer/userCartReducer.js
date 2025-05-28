import { ADD_TO_CART, SET_SELECTED_PRODUCT } from "../actionType/userActionType";

const initialState = {
  selectedProduct: null,
  cart: [],
};

const userCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };

    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex >= 0) {
        // Item already in cart: update quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        // New item: add to cart
        return { ...state, cart: [...state.cart, action.payload] };
      }

    default:
      return state;
  }
};


export default userCartReducer