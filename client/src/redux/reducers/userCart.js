import axios from 'axios'

// constant variables
const GET_USER_CART = 'GET_USER_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'

// action functions

export const getUserCart = () => dispatch => {
  axios.get('/api/user/cart')
    .then(res => {
      dispatch({
        type: GET_USER_CART,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const addItemToCart = (listingID, qty) => dispatch => {
  axios.post('/api/user/cart', {listing_id: listingID, qty: qty})
    .then(res => {
      dispatch({
        type: ADD_ITEM_TO_CART,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateItemInCart = (listingID, qty) => dispatch => {
  axios.put(`/api/user/cart/${listingID}`, {qty: qty})
    .then(res => {
      dispatch({
        type: UPDATE_ITEM_IN_CART,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const removeItemFromCart = (listingID) => dispatch => {
  axios.delete(`/api/user/cart/${listingID}`)
    .then(res => {
      dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const clearCart = () => dispatch => {
  axios.delete('/api/user/cart')
    .then(res => {
      dispatch({
        type: CLEAR_CART,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}

// reducer function
export default function userCartReducer(state = [], action) {
  
  switch(action.type) {
    case GET_USER_CART:
      return action.payload

    case ADD_ITEM_TO_CART:
      return [...state, action.payload]

    case UPDATE_ITEM_IN_CART:
      return state.map(item => {
        if (item.listing_id === action.payload.listing_id) {
          return action.payload
        } else {
          return item
        }
      })

    case REMOVE_ITEM_FROM_CART:
      return state.filter(item => item.listing_id !== action.payload.listing_id)

    case CLEAR_CART:
      return []
      
    default:
      return state;
  }

}