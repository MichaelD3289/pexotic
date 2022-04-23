import React from 'react'
import './MainProductPhoto.css'

import { useSelector, useDispatch } from 'react-redux'
import { addOrDeleteFavorite } from '../../../../redux/reducers/allFavorites'

import FavoriteHeart from '../../../FavoriteHeart/FavoriteHeart'

function MainProductPhoto() {
  const [isHovered, setIsHovered] = React.useState(false)

  const dispatch = useDispatch()

  const listing = useSelector(state => state.currentListing)

  const { id, photoUrls, name, isFavorite } = listing

  return (
    <div 
    className='main-photo-container'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && 
      <FavoriteHeart 
      isFavorited={isFavorite} 
      id={id}
      actionFunction={addOrDeleteFavorite}
      />}
      <img src={`/static/${photoUrls.mainPhoto}`} className='main-photo' alt={name}/>
    </div>
  )
}

export default MainProductPhoto