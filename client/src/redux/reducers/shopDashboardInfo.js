import axios from 'axios';

const GET_SHOP_DASHBOARD_INFO = 'GET_SHOP_DASHBOARD_INFO';

export const getShopDashboardInfo = () => dispatch => {
  axios.get('/api/shop/dashboard/info')
    .then(res => {
      dispatch({
        type: GET_SHOP_DASHBOARD_INFO,
        payload: {
          ...res.data,
          retreived: true
        }
      })
    })
    .catch(err => console.log(err))
}


const initialState = {
  today: {
    listingViews: 0,
    shopViews: 0,
    orders: 0,
    revenue: 0
  },
  yesterday: {
    listingViews: 0,
    shopViews: 0,
    orders: 0,
    revenue: 0
  },
  last7Days: {
    listingViews: 0,
    shopViews: 0,
    orders: 0,
    revenue: 0
  },
  last30Days: {
    listingViews: 0,
    shopViews: 0,
    orders: 0,
    revenue: 0
  },
  last90Days: {
    listingViews: 0,
    shopViews: 0,
    orders: 0,
    revenue: 0
  },
  last365Days: {
    listingViews: 0,
    shopViews: 0,
    orders: 0,
    revenue: 0
  },
  retreived: false
}

export default function shopDashboardInfo(state = initialState, action) {
  switch(action.type) {
    case GET_SHOP_DASHBOARD_INFO:
      return action.payload;
    default:
      return state
  }
}