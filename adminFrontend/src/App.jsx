import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadAdmin } from './redux/action/authActions'
import AdminRegister from './pages/AdminRegister'
import CategorySubcategoryManager from './components/CategorySubcategoryManager'
import CategoryList from './components/CategoryList'
import CategoryDetails from './components/CategoryDetails'

const App = () => {


   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdmin()); 
  }, []);


  return (
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<AdminRegister/>} />
      <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute>}>
        {/* <Route index element={<Navigate to="manage-category" />} /> */}
        <Route path="allProduct" element={<CategorySubcategoryManager/>} />
        <Route path="categories" element={<CategoryList/>} />
        <Route path="subcategories" element={<CategoryDetails/>} />
      
      </Route>
    </Routes>
  )
}

export default App