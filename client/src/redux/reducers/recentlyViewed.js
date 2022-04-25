import axios from 'axios'
// constant type variables
const FETCH_RECENTLY_VIEWED = 'FETCH_RECENTLY_VIEWED'
const ADD_TO_RECENTLY_VIEWED = 'ADD_TO_RECENTLY_VIEWED'

// action functions
export const fetchRecentlyViewed = () => dispatch => {
  
  dispatch({ type: `${FETCH_RECENTLY_VIEWED}_PENDING` })
  axios.get('/api/home/recently/viewed?limit=5')
    .then(res => {
      
      dispatch({ type: `${FETCH_RECENTLY_VIEWED}_FULFILLED`, payload: res.data })
      })
      .catch(err => {
        console.log(err)
      })

}

export const addToRecentlyViewed = (listingId) => dispatch => {
  dispatch({ type: `${ADD_TO_RECENTLY_VIEWED}_PENDING` })
  axios.post('/api/home/recently/viewed', {listingId})
    .then(res => {
      
      dispatch({ type: `${ADD_TO_RECENTLY_VIEWED}_FULFILLED`, payload: res.data })
  })
  .catch(err => {
    
    dispatch({ type: `${ADD_TO_RECENTLY_VIEWED}_REJECTED`, payload: err })
  })
}

// reducer function
export default function recentlyViewedReducer(state=[], action) {
  switch (action.type) {
    // case statements
    case `${FETCH_RECENTLY_VIEWED}_FULFILLED`:
      return action.payload;
    case `${FETCH_RECENTLY_VIEWED}_PENDING`:
      return state;
    case `${ADD_TO_RECENTLY_VIEWED}_REJECTED`:
      return state;
     case `${ADD_TO_RECENTLY_VIEWED}_FULFILLED`:
      return state;
    case `${ADD_TO_RECENTLY_VIEWED}_PENDING`:
      return state; 
    // default statement
    default:
      return state;
  }
}