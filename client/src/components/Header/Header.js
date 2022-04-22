import React from 'react'
import './Header.css'
import logo from '../../assets/images/pexotic.svg'
import SearchBar from '../SearchBar/SearchBar'
import CartIcon from '../CartIcon/CartIcon'
import ProfileBar from '../ProfileBar/ProfileBar'

import { useDispatch, useSelector } from 'react-redux'
import { toggleAccountPopUp } from '../../redux/reducers/accountPopUp' 

function Header() {
  const verified = useSelector(state => state.currentUser.verified)
  const dispatch = useDispatch();

  return (
      <header className='header'>
          <img 
           className='header-logo'
           src={logo}
           alt="pexotic logo"
           />
          <SearchBar />

          {verified ? <ProfileBar /> : 
          <button 
          className='sign-in'
          onClick={() => dispatch(toggleAccountPopUp())}
          ><div className='btn-hover'>Sign In</div></button>
          }

          <CartIcon />
          
          

      </header>
  )
}

export default Header