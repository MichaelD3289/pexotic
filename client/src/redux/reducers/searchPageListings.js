import axios from 'axios'

const FETCH_SEARCHED_LISTINGS = 'FETCH_SEARCHED_LISTINGS'

export const fetchSearchedListings = (body) => dispatch => {
  axios.post(`/api/search?q=${body.search}`, body)
    .then(res => {
      
      dispatch({
        type: FETCH_SEARCHED_LISTINGS,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export default function searchPageListingsReducer(state=[], action) {
  switch(action.type) {
    case FETCH_SEARCHED_LISTINGS:
      return action.payload
    default:
      return state
  }
}