import { SET_SELECTED_PRODUCT } from "../actionType/userActionType";


export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: product,
});

export const addToCart = (product, quantity = 1) => (dispatch, getState) => {
  const newItem = { ...product, quantity };

  dispatch({
    type:ADD_TO_CART,
    payload: newItem,
  });

};
