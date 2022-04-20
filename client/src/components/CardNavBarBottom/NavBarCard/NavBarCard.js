import React from 'react'
import './NavBarCard.css'
import shopImg from '../../../assets/placeholders/shop-placeholder.png'

function NavBarCard() {
  return (
    <li className='nav-item-b'>
    <a className='nav-link-b' href='#'>
      <h4 className='nav-item-title-b'>Jamie's Tarantulas
      </h4>
      <div className='white-bg'>
        <img className='nav-item-img-b' src={shopImg} alt="" />
      </div>
      
    </a>
    
  </li>
  )
}

export default NavBarCard