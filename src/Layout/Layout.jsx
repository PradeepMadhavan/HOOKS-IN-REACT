import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Home from '../Components/Pages/Home';




export default function Layout() {
  return (
    <div>
     
    <Header />
  {/* <Home /> */}
      <Outlet />
    </div>
  )
}
