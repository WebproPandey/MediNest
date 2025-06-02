import { ADD_TO_CART, ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, SET_SELECTED_PRODUCT, UPDATE_TOTAL_AMOUNT, UPDATE_WATCHLIST_QUANTITY } from "../actionType/userActionType";


export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: product,
});



export const addToCart = (product ,quantity) => (dispatch, getState) => {
try{  
  const totalPrice = product.price * product.quantity;
  
  const newItem = {
    ...product,
    quantity,
   totalPrice,
  };
  
  console.log("totalPrice",totalPrice)
  console.log("newItem",totalPrice ,newItem)

  dispatch({
    type: ADD_TO_CART,
    payload: newItem,
  })
   dispatch({
      type: SET_SELECTED_PRODUCT,
      payload: newItem, // Update selectedProduct with new quantity
    });
}catch(err){
  console.log("adderro" ,err)
}
};


export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

export const addToWatchlist = (product) => ({
  type: ADD_TO_WATCHLIST,
  payload: product,
});

export const removeFromWatchlist = (productId) => ({
  type: REMOVE_FROM_WATCHLIST,
  payload: productId,
});

export const updateWatchlistQuantity = (productId, quantity) => ({
  type: UPDATE_WATCHLIST_QUANTITY,
  payload: { productId, quantity },
});

export const updateTotalAmount = () => ({
  type: UPDATE_TOTAL_AMOUNT,
});
