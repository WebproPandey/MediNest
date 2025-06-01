import {configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import { categoryReducer } from './reducer/categoryReducer'
import { subcategoryReducer } from './reducer/subcategoryReducer'
import { allSubcategoriesReducer } from './reducer/allSubcategoriesReducer'
import { orderReducer } from './reducer/orderReducer'


const store =  configureStore({
   reducer: {
    auth: authReducer,
    category: categoryReducer,
    subcategories:subcategoryReducer,
    allSubcategories: allSubcategoriesReducer,
    orders: orderReducer,

  }
})

export default store


