import axios from 'axios'
import { toggleIsFavorite } from './currentListing'

const GET_ALL_FAVORITES = 'GET_ALL_FAVORITES'
const ADD_OR_DELETE_FAVORITE = 'ADD_OR_DELETE_FAVORITE'


export const getAllFavorites = () => dispatch => {
  axios.get('/api/user/favorites')
    .then(res => {
      dispatch({
        type: GET_ALL_FAVORITES,
        payload: res.data.map(item => item.listing_id)
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const addOrDeleteFavorite = (listingID, action) => dispatch => {
  if (action === 'add') {
  dispatch(toggleIsFavorite())
  axios.post('/api/user/favorites', {listing_id: listingID})
    .then(res => {
      dispatch(getAllFavorites())
    })
    .catch(err => {
      console.log(err)
    })
  } else if (action === 'delete') {
    dispatch(toggleIsFavorite())
    axios.delete(`/api/user/favorites/${listingID}`)
    .then(res => {
      dispatch(getAllFavorites())
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export default function allFavoritesReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_FAVORITES:
      return action.payload
    default:
      return state;
  }
}