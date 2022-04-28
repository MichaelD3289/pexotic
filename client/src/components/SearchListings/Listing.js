import React from 'react'
import './Listing.css'
import {Link} from 'react-router-dom'

import redXIcon from '../../assets/icons/red-x-circle-icon.svg'
import greenCheckMark from '../../assets/icons/checkmark-circle-icon.svg'

import FavoriteHeart from '../FavoriteHeart/FavoriteHeart'

function Listing({listing, ...props}) {
  const {
    listing_id: id, main_photo: img_url, price, qty, listing_name: title
  } = listing;

  const [isHovered, setIsHovered] = React.useState(false)
  const maxTitleLength = 30
  // adding "..." to the end of the card name if it is too long
  title.length > maxTitleLength && (title = title.slice(0, maxTitleLength) + '...')

  return (
    
    <div 
      id='search-listing'
      className={`${qty === 0 ? 'out-of-stock' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FavoriteHeart
        id={id}
        isHovered={isHovered}
        style={{
          top: '15px',
          right: '15px',
          width: '40px',
          height: '40px',
        }} 
      />
      <Link className='search-listing-link' to={`/product/listing/${id}`}>
      <img 
        className='search-listing-img' 
        src={`/static/${img_url}`} 
        alt={title} 
      />
      <h4>{title}</h4>
      <div className='search-listing-price-qty-container'>
        <h5><span>$</span>{price}</h5>
        <div className='search-listing-stock-indicator'>
          {qty !== 0 ? 
          <img src={greenCheckMark} 
          alt="green check mark" 
          className='green-check-mark'/> :
          <img src={redXIcon} 
          alt="red X circle icon" 
          className='red-x-circle'/>}
          <p>In Stock</p>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default Listing