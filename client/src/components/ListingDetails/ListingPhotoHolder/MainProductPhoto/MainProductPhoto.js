import React from 'react'
import './MainProductPhoto.css'

import { useSelector, useDispatch } from 'react-redux'
import { addOrDeleteFavorite } from '../../../../redux/reducers/allFavorites'

import FavoriteHeart from '../../../FavoriteHeart/FavoriteHeart'

function MainProductPhoto() {
  const [isHovered, setIsHovered] = React.useState(false)
  const listing = useSelector(state => state.currentListing)
  const { id, photoUrls, name } = listing

  const dispatch = useDispatch()

  return (
    <div 
    className='main-photo-container'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >

      <FavoriteHeart 
      id={id}
      isHovered={isHovered}
      />
      <img src={`${photoUrls.mainPhoto}`} className='main-photo' alt={name}/>
    </div>
  )
}

export default MainProductPhoto