import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import currentUserReducer from './reducers/currentUser';
import categoryReducer from './reducers/categoryReducer';
import accountPopUpReducer from './reducers/accountPopUp';
import accountSuccessReducer from './reducers/accountSuccess';
import currentListingReducer from './reducers/currentListing'
import allFavoritesReducer from './reducers/allFavorites'
import userCartReducer from './reducers/userCart'
import popularListingReducer from './reducers/popularListing'
import viewShopsReducer from './reducers/viewShops'
import recentlyViewedReducer from './reducers/recentlyViewed'
import currentShopReducer from './reducers/currentShop'

const rootReducer = combineReducers({
  // reducers go here
  currentUser: currentUserReducer,
  categories: categoryReducer,
  popularListings: popularListingReducer,
  accountPopUp: accountPopUpReducer,
  accountSuccess: accountSuccessReducer,
  currentListing: currentListingReducer,
  allFavorites: allFavoritesReducer,
  userCart: userCartReducer,
  viewShops: viewShopsReducer,
  recentlyViewed: recentlyViewedReducer,
  currentShop: currentShopReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

export default store;