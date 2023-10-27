import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Dashboard } from '../Pages/Dashboard'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import PrivateRoute from './PrivateRoute'
export const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
</Routes>
  )
}
