import React from 'react'
import './Listing.css'
import listingImg from '../../assets/placeholders/listing-placeholder.jpg'
import { Link } from 'react-router-dom'
import FavoriteHeart from '../FavoriteHeart/FavoriteHeart'

import { useDispatch, useSelector } from 'react-redux'
import { getListing } from '../../redux/reducers/currentListing'


function Listing({ id, title, price, qty, main_photo, isFavorite, ...props }) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const favoriteList = useSelector(state => state.allFavorites)
  // console.log(favoriteList.includes(id))
  const [isFavorited, setIsFavorited] = React.useState(false)
  
  const dispatch = useDispatch()

  React.useEffect(() => {
    setIsFavorited(favoriteList.includes(id))
  }, [favoriteList, id])

  return (
    <Link
    className='popular-listing-link'
    to={`/product/listing/${id}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
  {isHovered && <FavoriteHeart
      isFavorited={isFavorited}
      id={id}
      actionFunction={() => {}}
      style={{
        width: '35px',
        height: '35px'
      }}
      />}
    <div 
    className={"popular-listing-item" + (qty === 0 ? " item-out-of-stock" : "")}
    >
    
          <img 
          className={`popular-listing-img ${qty === 0 ? 'item-out-of-stock' : ''}`} 
          src={`/static/${main_photo}`} 
          alt={title} 
          onClick={() => dispatch(getListing(id))}/>
          
        </div></Link>
  )
}

export default Listing