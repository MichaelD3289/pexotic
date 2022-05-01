import React, {useEffect} from 'react'
import './BreederDashboard.css'
import {Routes, Route, NavLink, Outlet} from 'react-router-dom'

function BreederDashboard() {


  useEffect(() => {
    document.title = 'Pexotic | Breeder |'
  })

  return (
    <section id='breeder-dashboard'>
      <nav id='breeder-dashboard-nav'>
        <NavLink 
          to='/breeder/dashboard/main' 
          activeclassname='active'
          className='breeder-dashboard-nav-link'
        >
          Dashboard
        </NavLink>
        <NavLink 
          to='/breeder/dashboard/listings' 
          activeclassname='active'
          className='breeder-dashboard-nav-link'
        >
          Listings
        </NavLink>
        <NavLink 
          to='/breeder/dashboard/messages'
          activeclassname='active'
          className='breeder-dashboard-nav-link'
        >
          Messages
        </NavLink>
        <NavLink 
          to='/breeder/dashboard/account'
          activeclassname='active'
          className='breeder-dashboard-nav-link'
        >
          Account
        </NavLink>
      </nav>
      <div className='breeder-dashboard-display'>
        <Outlet />
      </div>
    </section>
  )
}

export default BreederDashboard