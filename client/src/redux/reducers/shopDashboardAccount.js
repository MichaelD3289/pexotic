import axios from 'axios'

const GET_SHOP_ACCOUNT = 'GET_SHOP_ACCOUNT';
const SET_SHOP_ACCOUNT_SEARCH_TERM = 'SET_SHOP_ACCOUNT_SEARCH_TERM';

export const getShopAccount = () => dispatch => {
  axios.get('/api/shop/dashboard/account')
  .then(res => {
    let [shop, ...shopsListings] = res.data;
     document.title = `Pexotic | Dashboard | Account | ${shop.company_name}`
      dispatch({ 
        type: GET_SHOP_ACCOUNT, 
        payload: { 
            shop,
            shopsListings ,
            shopCategories: [...new Set(shopsListings.map(listing => listing.category_name))]
          }} 
      )
      dispatch(setShopAccountSearchTerm('All'))
    })
    .catch(err => {
      console.log(err)
    })
}

export const setShopAccountSearchTerm = (word) => {
  return {
    type: SET_SHOP_ACCOUNT_SEARCH_TERM,
    payload: word
  }
}


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

  export default function shopDashboardAccountReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SHOP_ACCOUNT:
        return {
          ...state,
          ...action.payload
        };
      case SET_SHOP_ACCOUNT_SEARCH_TERM:
        return {
          ...state,
          searchCategory: action.payload
        }
      default:
        return state;
    }
  }