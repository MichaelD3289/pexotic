import axios from 'axios'

const GET_POPULAR_LISTINGS = 'GET_POPULAR_LISTINGS'

export const getPopularListings = () => dispatch => {
  axios.get('/api/listing/popular?limit=10')
    .then(res => {
      dispatch({
        type: GET_POPULAR_LISTINGS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export default function popularListingReducer(state = [], action) {
  switch(action.type) {
    case GET_POPULAR_LISTINGS:
      return action.payload
    default:
      return state
  }
}