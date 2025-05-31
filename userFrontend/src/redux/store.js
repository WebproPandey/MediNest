import   { configureStore }  from "@reduxjs/toolkit"
import { authReducer } from "./reducer/authReducer";
import { userCategoryReducer } from "./reducer/userCategoryReducer";
import { productsByCategoryReducer } from "./reducer/productsByCategoryReducer";
import userCartReducer from "./reducer/userCartReducer";
import { userWatchlistReducer } from "./reducer/userWatchlistReducer";
import { randomProductsReducer } from "./reducer/productReducer";

const store = configureStore({
    reducer :{
     user: authReducer,
     userCategories: userCategoryReducer,
     productsByCategory:productsByCategoryReducer,
     userCart: userCartReducer,
     userWatchlist:userWatchlistReducer,
     randomProducts:randomProductsReducer,
     
    }
})

export default store;
