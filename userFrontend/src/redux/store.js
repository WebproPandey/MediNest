import   { configureStore }  from "@reduxjs/toolkit"
import { authReducer } from "./reducer/authReducer";

const store = configureStore({
    reducer :{
     user: authReducer
    }
})

export default store;
