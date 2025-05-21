import {configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import { categoryReducer } from './reducer/categoryReducer'
import { subcategoryReducer } from './reducer/subcategoryReducer'

const store =  configureStore({
   reducer: {
    auth: authReducer,
    category: categoryReducer,
    subcategories:subcategoryReducer,

  }
})

export default store


