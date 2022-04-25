import axios from 'axios'

const GET_SHOP = 'GET_SHOP'

export const getShop = (shopId) => dispatch => {
  dispatch({ type: `${GET_SHOP}_PENDING` })
  axios.get(`/api/shops/${shopId}`)
    .then(res => {
      dispatch({ type: `${GET_SHOP}_FULFILLED`, payload: res.data })
    })
    .catch(err => {
      console.log(err)
    })
  }

export default function currentShopReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_CURRENT_SHOP_FULFILLED':
      return action.payload;
    case 'FETCH_CURRENT_SHOP_PENDING':
      return state;
    default:
      return state;
  }
}