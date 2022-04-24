import axios from 'axios'
// constant type variables
const FETCH_SHOPS = 'FETCH_SHOPS'

// action functions
export const fetchShops = () => dispatch => {
  dispatch({ type: `${FETCH_SHOPS}_PENDING` })
  axios.get('/api/home/view/shops?limit=5')
    .then(res => {
      console.log(res.data)
      dispatch({ type: `${FETCH_SHOPS}_FULFILLED`, payload: res.data })
})
}

// reducer function
export default function viewShopsReducer(state=[], action) {
  switch (action.type) {
    // case statements
    case `${FETCH_SHOPS}_FULFILLED`:
      return action.payload;
    case `${FETCH_SHOPS}_PENDING`:
      return state;
    // default statement
    default:
      return state;
  }
}