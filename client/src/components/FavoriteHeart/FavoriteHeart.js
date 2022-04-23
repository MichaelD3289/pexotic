import React from 'react'
import './FavoriteHeart.css'

import emptyHeart from '../../assets/icons/heart-empty.svg'
import filledHeart from '../../assets/icons/heart-filled.svg'

import { useSelector, useDispatch } from 'react-redux'
import { toggleIsFavorite } from '../../redux/reducers/currentListing'

function FavoriteHeart({isFavorited, id, actionFunction, ...props}) {
  
  const inFavoritesList = useSelector(state => state.allFavorites.includes(id))


  const [isFavorite, setIsFavaorite] = React.useState(inFavoritesList || isFavorited)


  const heartIcon = isFavorite ? filledHeart : emptyHeart
  const action = isFavorite ? 'delete' : 'add'
  const dispatch = useDispatch()

  return (
    <div
    id='heart-container'
     {...props}
     onClick={() => {
       setIsFavaorite(!isFavorite)
       dispatch(toggleIsFavorite())
       dispatch(actionFunction(id, action))
    }}
     >
      <img src={heartIcon} 
      alt="heart icon" 
      className='heart-icon'/>
    </div>
  )
}

export default FavoriteHeart