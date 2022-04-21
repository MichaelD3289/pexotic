import React from 'react'
import './Header.css'
import logo from '../../assets/images/pexotic.svg'
import SearchBar from '../SearchBar/SearchBar'
import CartIcon from '../CartIcon/CartIcon'

import { useDispatch } from 'react-redux'
import { toggleAccountPopUp } from '../../redux/reducers/accountPopUp' 

function Header() {

  const dispatch = useDispatch();

  return (
      <header className='header'>
          <img 
           className='header-logo'
           src={logo}
           alt="pexotic logo"
           />
          <SearchBar />
          <button 
          className='sign-in'
          onClick={() => dispatch(toggleAccountPopUp())}
          ><div className='btn-hover'>Sign In</div></button>
          <CartIcon />
          
          

      </header>
  )
}

export default Header