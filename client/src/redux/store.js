import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import currentUserReducer from './reducers/currentUser';
import categoryReducer from './reducers/categoryReducer';


const rootReducer = combineReducers({
  // reducers go here
  currentUser: currentUserReducer,
  categories: categoryReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

export default store;