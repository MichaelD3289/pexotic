import axios from 'axios'

const GET_SHOP = 'GET_SHOP'

export const getShop = (shopId) => dispatch => {
  dispatch({ type: `${GET_SHOP}_PENDING` })
  axios.get(`/api/shops/${shopId}`)
    .then(res => {
      
     let [shop, ...shopsListings] = res.data;
     document.title = `Pexotic | Breeder Shop | ${shop.company_name}`
      dispatch({ 
        type: `${GET_SHOP}_FULFILLED`, 
        payload: { shop, shopsListings }} 
      )
    })
    .catch(err => {
      console.log(err)
    })
  }

  //initial state
  const initialState = {
    shop: {
      seller_id: '',
      company_name: '',
      img_url: '',
      cover_img_url: '',
      city: '',
      state: ''
    },
    shopsListings: []
  }

export default function currentShopReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SHOP}_FULFILLED`:
      return action.payload;
    case `${GET_SHOP}_PENDING`:
      return state;
    default:
      return state;
  }
}