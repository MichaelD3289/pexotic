import React from 'react'
import './Header.css'
import logo from '../../assets/images/pexotic.svg'
import SearchBar from '../SearchBar/SearchBar'
import CartIcon from '../CartIcon/CartIcon'

function Header() {
  return (
      <header className='header'>
          <img 
           className='header-logo'
           src={logo}
           alt="pexotic logo"
           />
          <SearchBar />
          <button className='sign-in'>Sign In</button>
          <CartIcon />
          
          

      </header>
  )
}

export default Header