import React from 'react'
import './FavoriteHeart.css'

import emptyHeart from '../../assets/icons/heart-empty.svg'
import filledHeart from '../../assets/icons/heart-filled.svg'

import { useSelector, useDispatch } from 'react-redux'
import { addOrDeleteFavorite } from '../../redux/reducers/allFavorites'

function FavoriteHeart({id, isHovered, style, ...props}) {
  const [isFavorited, setIsFavorited] = React.useState(false)
  const dispatch = useDispatch()
  const favoriteList = useSelector(state => state.allFavorites).map(favorite => favorite.listing_id)

  React.useEffect(() => {
    setIsFavorited(favoriteList.includes(id))
  }, [favoriteList])

  const toggleFavorite = (id, action) => {
    setIsFavorited(!isFavorited)
    dispatch(addOrDeleteFavorite(id, action))
  }

  const heartIcon = isFavorited ? filledHeart : emptyHeart
  const action = isFavorited ? 'delete' : 'add'
  
  const display = isHovered ? 'flex' : 'none'

  return (
    <div
    id='heart-container'
     {...props}
     onClick={() => {
       toggleFavorite(id, action)
    }}
    style={{...style, display: display}}
     >
      <img src={heartIcon} 
      alt="heart icon" 
      className='heart-icon'/>
    </div>
  )
}

export default FavoriteHeart