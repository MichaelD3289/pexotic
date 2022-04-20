import React from 'react'
import './CardNavBarTop.css'
import NavBarCard from './NavBarCard/NavBarCard';

function CardNavBarTop({header, learnMore, cards}) {


  learnMore = learnMore.split(' ')

  return (
    <nav className='card-nav-top'>
      <div className='color-bar'>
        <h2 className='nav-name'>{header}</h2>
      </div>

      <ul className='nav-list'>
      {cards.map((card) => (
        <NavBarCard key={card.id} cardInfo={card} />
      ))
        }
 
        <li className='nav-item see-more'>    
            {learnMore[0]}
            <br/>
            {learnMore[1]}
        </li>

      </ul>
    </nav>
  )
}

export default CardNavBarTop