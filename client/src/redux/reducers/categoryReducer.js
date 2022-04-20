import axios from 'axios'
// constant type variables
const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

// action functions
export const fetchCategories = () => dispatch => {
  dispatch({ type: `${FETCH_CATEGORIES}_PENDING` })
  axios.get('/api/categories')
    .then(res => {
      console.log(res.data)
      dispatch({ type: `${FETCH_CATEGORIES}_FULFILLED`, payload: res.data })
})
}

// reducer function
export default function categoryReducer(state=[], action) {
  switch (action.type) {
    // case statements
    case 'FETCH_CATEGORIES_FULFILLED':
      return action.payload;
    case 'FETCH_CATEGORIES_PENDING':
      return state;
    // default statement
    default:
      return state;
  }
}