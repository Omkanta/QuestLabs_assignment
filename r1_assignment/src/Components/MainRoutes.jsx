import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Dashboard } from '../Pages/Dashboard'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
export const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
</Routes>
  )
}
