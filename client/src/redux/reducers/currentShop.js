import axios from 'axios'

const GET_SHOP = 'GET_SHOP'
const SET_SEARCH_TERM = 'SET_SEARCH_TERM'

export const getShop = (shopId) => dispatch => {
  dispatch({ type: `${GET_SHOP}_PENDING` })
  axios.get(`/api/shops/${shopId}`)
    .then(res => {
      
     let [shop, ...shopsListings] = res.data;
     document.title = `Pexotic | Breeder Shop | ${shop.company_name}`
      dispatch({ 
        type: `${GET_SHOP}_FULFILLED`, 
        payload: { 
            shop,
            shopsListings ,
            shopCategories: [...new Set(shopsListings.map(listing => listing.category_name))]
          }} 
      )
      dispatch(setSearchTerm('All'))
    })
    .catch(err => {
      console.log(err)
    })
  }

  export const setSearchTerm = (word) => {
    return {
      type: SET_SEARCH_TERM,
      payload: word
    }
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
    shopsListings: [],
    shopCategories: [],
    searchCategory: '',
  }

export default function currentShopReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SHOP}_FULFILLED`:
      return {
        ...state,
        ...action.payload
      };
    case `${GET_SHOP}_PENDING`:
      return state;
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchCategory: action.payload
      }
    default:
      return state;
  }
}