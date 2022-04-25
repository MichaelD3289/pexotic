import React from 'react'
import './NavBarCard.css'

import FavoriteHeart from '../../FavoriteHeart/FavoriteHeart'
import PriceBadge from '../../PriceBadge/PriceBadge'

function NavBarCard({id, image_url, image_alt, card_name, qty, price, ...props}) {
  const [isHovered, setIsHovered] = React.useState(false)
  // max length of title before "..." is added
  const maxTitleLength = 17

  // adding "..." to the end of the card name if it is too long
  card_name.length > maxTitleLength && (card_name = card_name.slice(0, maxTitleLength) + '...')
  
  return (
    <li 
    className='nav-item'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {price && 
      <FavoriteHeart 
        id={id} 
        isHovered={isHovered}
        // style={{
        //   width: '40px',
        //   height: '40px',
        //   top: '5px',
        //   right: '50%',
        //   transform: 'translateX(50%)'
        // }} 
      />}
          <a className='nav-link' href='#'>
            <img className='nav-item-img' src={`/static/${image_url}`} alt={image_alt} />
            <h4 className='nav-item-title'>{card_name}</h4>
          </a>
          {price && 
          <PriceBadge 
            price={price}
            style={{
              padding: '6px 14px 6px',
              fontSize: '1rem'
            }} 
          />}
        </li>
  )
}

export default NavBarCard