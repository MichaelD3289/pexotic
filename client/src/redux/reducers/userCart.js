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
      
      const {cartItem, listing} = res.data
      const {listing_id, qty, cart_item_id} = cartItem
      const {listing_name, main_photo, seller_id, shipping_price, current_discount, price} = listing
      dispatch({
        type: ADD_ITEM_TO_CART,
        payload:   {
          cart_item_id: cart_item_id,
          listing_id: listing_id,
          listing_name: listing_name,
          qty: qty,
          price: price,
          shipping_price: shipping_price,
          seller_id: seller_id,
          main_photo: main_photo,
          current_discount: current_discount
        
      }
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



// initial state
// cart object shape
  /* 
  {
    cart_item_id: INT,
    listing_id: INT,
    listing_name: STRING,
    qty: INT,
    price: INT,
    shipping_price: INT,
    seller_id: INT,
    main_photo: STRING,
    current_discount: INT
  },
  */


// reducer function
export default function userCartReducer(state = [], action) {
  
  switch(action.type) {
    case GET_USER_CART:
      return action.payload

    case ADD_ITEM_TO_CART:

      const newState = state.filter(item => item.listing_id !== action.payload.listing_id)
      
      return  [...newState, action.payload]

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