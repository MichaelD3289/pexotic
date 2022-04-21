import React from 'react'
import './NavBarCard.css'

function NavBarCard({cardInfo: {id, image_url, image_alt, category_name: card_name}, ...props}) {
  // max length of title before "..." is added
  const maxTitleLength = 18

  // adding "..." to the end of the card name if it is too long
  card_name.length > maxTitleLength && (card_name = card_name.slice(0, maxTitleLength) + '...')
  
  return (
    <li className='nav-item'>
          <a className='nav-link' href='#'>
            <img className='nav-item-img' src={`/static/${image_url}`} alt={image_alt} />
            <h4 className='nav-item-title'>{card_name}</h4>
          </a>
        </li>
  )
}

export default NavBarCard