import React from 'react'
import './CardNavBarTop.css'
import NavBarCard from './NavBarCard/NavBarCard';
import { Link } from 'react-router-dom'

function CardNavBarTop({header, learnMore, cards}) {
  learnMore = learnMore.split(' ')

  return (
    <nav className='card-nav-top'>
      <div className='color-bar'>
        <h2 className='nav-name'>{header}</h2>
      </div>

      <ul className='nav-list'>
      {cards.map((card) => (
<NavBarCard
        key={card.category_id || card.listing_id} 
        id={card.category_id || card.listing_id}
        image_url={card.image_url || card.main_photo}
        image_alt={card.image_alt || card.listing_name}
        card_name={card.category_name || card.listing_name}
        qty={card.qty}
        price={card.price}
         />
      ))
        }
 
        {cards.length > 4 && 
        <Link 
          to='/search'
          className='card-nav-top-link'
        >
          <li className='nav-item see-more'>    
            {learnMore[0]}
            <br/>
            {learnMore[1]}
          </li>
        </Link>}

      </ul>
    </nav>
  )
}

export default CardNavBarTop