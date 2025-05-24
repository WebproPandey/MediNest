import   { configureStore }  from "@reduxjs/toolkit"
import { authReducer } from "./reducer/authReducer";
import { userCategoryReducer } from "./reducer/userCategoryReducer";

const store = configureStore({
    reducer :{
     user: authReducer,
     userCategories: userCategoryReducer,
    }
})

export default store;
