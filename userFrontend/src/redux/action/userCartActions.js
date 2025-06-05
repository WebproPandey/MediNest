import { toast } from "react-toastify";
import {
  ADD_TO_CART,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  SET_SELECTED_PRODUCT,
  UPDATE_TOTAL_AMOUNT,
  UPDATE_WATCHLIST_QUANTITY,
  REMOVE_FROM_CART,
} from "../actionType/userActionType";

// Set selected product
export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: product,
});

// Add to Cart
export const addToCart = (product, quantity) => (dispatch, getState) => {
  try {
    const totalPrice = product.price * quantity;

    const newItem = {
      ...product,
      quantity,
      totalPrice,
    };

    dispatch({
      type: ADD_TO_CART,
      payload: newItem,
    });

    toast.success("Added to cart successfully!");

    dispatch({
      type: SET_SELECTED_PRODUCT,
      payload: newItem,
    });
  } catch (error) {
    toast.error("Failed to add to cart.");
    console.error("Add to cart error:", error);
  }
};

// Remove from Cart
export const removeFromCart = (productId) => (dispatch) => {
  try {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });

    toast.success("Removed from cart!");
  } catch (error) {
    toast.error("Failed to remove from cart.");
    console.error("Remove from cart error:", error);
  }
};

// Add to Watchlist
export const addToWatchlist = (product) => (dispatch) => {
  try {
    dispatch({
      type: ADD_TO_WATCHLIST,
      payload: product,
    });
    toast.success("Added to watchlist!");
  } catch (error) {
    toast.error("Failed to add to watchlist.");
  }
};

// Remove from Watchlist
export const removeFromWatchlist = (productId) => (dispatch) => {
  try {
    dispatch({
      type: REMOVE_FROM_WATCHLIST,
      payload: productId,
    });
    toast.success("Removed from watchlist!");
  } catch (error) {
    toast.error("Failed to remove from watchlist.");
  }
};

// Update Watchlist Quantity
export const updateWatchlistQuantity = (productId, quantity) => (dispatch) => {
  try {
    dispatch({
      type: UPDATE_WATCHLIST_QUANTITY,
      payload: { productId, quantity },
    });
  } catch (error) {
  }
};

// Update Total Amount (used after cart quantity updates etc.)
export const updateTotalAmount = () => (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TOTAL_AMOUNT,
    });
    // Optional: toast here if needed
  } catch (error) {
    toast.error("Failed to update total amount.");
  }
};
