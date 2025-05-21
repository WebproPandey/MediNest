import {configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import { categoryReducer } from './reducer/categoryReducer'
import { subcategoryReducer } from './reducer/subcategoryReducer'
import { allSubcategoriesReducer } from './reducer/allSubcategoriesReducer'

const store =  configureStore({
   reducer: {
    auth: authReducer,
    category: categoryReducer,
    subcategories:subcategoryReducer,
    allSubcategories: allSubcategoriesReducer,

  }
})

export default store


