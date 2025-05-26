import   { configureStore }  from "@reduxjs/toolkit"
import { authReducer } from "./reducer/authReducer";
import { userCategoryReducer } from "./reducer/userCategoryReducer";
import { productsByCategoryReducer } from "./reducer/productsByCategoryReducer";

const store = configureStore({
    reducer :{
     user: authReducer,
     userCategories: userCategoryReducer,
     productsByCategory:productsByCategoryReducer
     
    }
})

export default store;
