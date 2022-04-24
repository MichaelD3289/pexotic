import axios from 'axios'

// constant varables
const GET_LISTING = 'GET_LISTING'
const SET_MAIN_LISTING_PHOTO = 'SET_MAIN_LISTING_PHOTO'

//action functions

export const getListing = (listingID) => dispatch => {
  
  axios
    .get(`/api/listings/${listingID}`)
    .then(({data}) => {
      
      const {listing_id, listing_name, description, price, sku, shipping_price, current_discount, main_photo, subcategory_id, seller_id, species_id, number_sold, qty_in_stock, photo_two, photo_three, photo_four, photo_five, shoplogo, shopname} = data[0]

      dispatch({
        type: GET_LISTING,
        payload: {
          id: listing_id,
          name: listing_name,
          description: description,
          price: price,
          qty: qty_in_stock,
          sku: sku,
          shippingPrice: shipping_price,
          currentDiscount: current_discount,
          photoUrls: {
            mainPhoto: main_photo,
            altImages: [main_photo, photo_two, photo_three, photo_four, photo_five]
          },
          category: subcategory_id,
          sellerId: seller_id,
          speciesId: species_id,
          numberSold: number_sold,
          shopLogo: shoplogo,
          shopName: shopname
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const setMainListingPhoto = (photoUrl) => {
  return {
    type: SET_MAIN_LISTING_PHOTO,
    payload: photoUrl
  }
}

export const toggleIsFavorite = () =>  {
  return {
    type: 'TOGGLE_IS_FAVORITE'
  }
}


//initial state

const initialState = {
  id: "",
  name: "",
  description: "",
  price: '',
  qty: '',
  sku: '',
  shippingPrice: '',
  currentDiscount: '',
  photoUrls: {
    mainPhoto: '',
    altImages: []
  },
  category: '',
  sellerId: '',
  speciesId: '',
  numberSold: '',
  isFavorite: false
}

//reducer function
export default function currentListingReducer(state=initialState, action) {
  switch (action.type) {
    // case statements
   case GET_LISTING:
      return {
        ...state,
        ...action.payload
      }
    case SET_MAIN_LISTING_PHOTO:
      return {
        ...state,
        photoUrls: {
          ...state.photoUrls,
          mainPhoto: action.payload
        }
      }
    case 'TOGGLE_IS_FAVORITE':
      return {
        ...state,
        isFavorite: !state.isFavorite
      }
    // default statement
    default:
      return state;
  }
}