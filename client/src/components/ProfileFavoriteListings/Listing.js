import React from 'react'
import './Listing.css'
import { Link } from 'react-router-dom'
import FavoriteHeart from '../FavoriteHeart/FavoriteHeart'
import PriceBadge from '../PriceBadge/PriceBadge'

import { useDispatch } from 'react-redux'
import { getListing } from '../../redux/reducers/currentListing'


function Listing({ id, title, price, qty, main_photo, isFavorite, ...props }) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const dispatch = useDispatch()
  
  return (

    <div 
    className={"profile-favorite-listing-item" + (qty === 0 ? " item-out-of-stock" : "")}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    > 
    
    <FavoriteHeart
      id={id}
      style={{
        width: '30px',
        height: '30px'
      }}
      isHovered={isHovered}
      />
      <PriceBadge price={price}  />
    
       <Link
    className='profile-favorite-listing-link'
    to={`/product/listing/${id}`}
    >
    
          <img 
          className={`profile-favorite-listing-img ${qty === 0 ? 'item-out-of-stock' : ''}`} 
          src={`${main_photo}`} 
          alt={title} 
          onClick={() => dispatch(getListing(id))}/>
          </Link>
        </div>
  )
}

export default Listing