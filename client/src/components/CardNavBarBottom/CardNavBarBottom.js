import React from 'react'
import './CardNavBarBottom.css'
import NavBarCard from './NavBarCard/NavBarCard'

function CardNavBarBottom({header, learnMore, cards}) {

  learnMore = learnMore.split(' ')
  return (
    <nav className='card-nav-top-b'>
     
      <ul className='nav-list-b'>
        <li className='nav-item-b see-more-b'>
          
            {learnMore[0]}
            <br/>
            {learnMore[1]}
        
        </li>
        {cards.map((card) => (
          <NavBarCard key={card.seller_id} cardInfo={card} />
        ))}
      </ul>
      <div className='color-bar-b'>
        <h2 className='nav-name-b'>{header}</h2>
      </div>
    </nav>
  )
}

export default CardNavBarBottom