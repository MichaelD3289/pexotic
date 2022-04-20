import React from 'react'
import './CardNavBarBottom.css'
import shopImg from '../../assets/placeholders/shop-placeholder.png'
import NavBarCard from './NavBarCard/NavBarCard'

function CardNavBarBottom({header, learnMore}) {

  learnMore = learnMore.split(' ')
  return (
    <nav className='card-nav-top-b'>
     
      <ul className='nav-list-b'>
        <li className='nav-item-b see-more-b'>
          
            {learnMore[0]}
            <br/>
            {learnMore[1]}
        
        </li>
        <NavBarCard />
        <NavBarCard />
        <NavBarCard />
        <NavBarCard />
        <NavBarCard />
      </ul>
      <div className='color-bar-b'>
        <h2 className='nav-name-b'>{header}</h2>
      </div>
    </nav>
  )
}

export default CardNavBarBottom