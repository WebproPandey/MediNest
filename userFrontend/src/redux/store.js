import   { configureStore }  from "@reduxjs/toolkit"
import { authReducer } from "./reducer/authReducer";
import { userCategoryReducer } from "./reducer/userCategoryReducer";
import { productsByCategoryReducer } from "./reducer/productsByCategoryReducer";
import userCartReducer from "./reducer/userCartReducer";
import { userWatchlistReducer } from "./reducer/userWatchlistReducer";
import { randomProductsReducer } from "./reducer/productReducer";
import { addressReducer } from "./reducer/addressReducer";
import { userOrdersReducer } from "./reducer/orderReducer";

const store = configureStore({
    reducer :{
     user: authReducer,
     userCategories: userCategoryReducer,
     productsByCategory:productsByCategoryReducer,
     userCart: userCartReducer,
     userWatchlist:userWatchlistReducer,
     randomProducts:randomProductsReducer,
     addresses: addressReducer,
     userOrders: userOrdersReducer,

     
    }
})

export default store;
