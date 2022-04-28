import axios from 'axios'

const FETCH_POPULAR_SEARCH_TERMS = 'FETCH_POPULAR_SEARCH_TERMS'

export const fetchPopularSearchTerms = () => dispatch => {
  axios.get('/api/popular-search-terms?limit=20')
    .then(res => {
      dispatch({
        type: FETCH_POPULAR_SEARCH_TERMS,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export default function popularSearchTermsReducer(state=[], action) {
  switch(action.type) {
    case FETCH_POPULAR_SEARCH_TERMS:
      return action.payload
    default:
      return state
  }
}