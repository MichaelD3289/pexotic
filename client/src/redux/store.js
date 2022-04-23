import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import currentUserReducer from './reducers/currentUser';
import categoryReducer from './reducers/categoryReducer';
import accountPopUpReducer from './reducers/accountPopUp';
import accountSuccessReducer from './reducers/accountSuccess';
import currentListingReducer from './reducers/currentListing'
import allFavoritesReducer from './reducers/allFavorites'


const rootReducer = combineReducers({
  // reducers go here
  currentUser: currentUserReducer,
  categories: categoryReducer,
  accountPopUp: accountPopUpReducer,
  accountSuccess: accountSuccessReducer,
  currentListing: currentListingReducer,
  allFavorites: allFavoritesReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

export default store;