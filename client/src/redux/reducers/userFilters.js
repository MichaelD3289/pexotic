import axios from 'axios';

const ADD_FILTER_PRICE = 'ADD_FILTER_PRICE';
const ADD_FILTER_CATEGORY = 'ADD_FILTER_CATEGORY';
const ADD_LOCATION_OBJECTS = 'ADD_LOCATION_OBJECTS';
const ADD_TO_CURRENT_TAGS = 'ADD_TO_CURRENT_TAGS';
const REMOVE_FROM_CURRENT_TAGS = 'REMOVE_FROM_CURRENT_TAGS';
const FILTER_LOCATION_OBJECTS = 'FILTER_LOCATION_OBJECTS';
const TOGGLE_ALL_LOCATION_CHECKED = 'TOGGLE_ALL_LOCATION_CHECKED';
const TOGGLE_LOCATION_CHECKED = 'TOGGLE_LOCATION_CHECKED';
const SET_SEARCHBAR_TERM = 'SET_SEARCHBAR_TERM';

export const addToCurrentTags = (tag, type) => {
  return {
    type: ADD_TO_CURRENT_TAGS,
    payload: {tag, type}
  }
}

export const removeFromCurrentTags = (tag, type) => {
  return {
    type: REMOVE_FROM_CURRENT_TAGS,
    payload: {tag, type}
  }
}

export const addLocationObjects = (states) => dispatch => {
  dispatch({
    type: ADD_LOCATION_OBJECTS,
    payload: states.map(state => ({
      [state]: true,
      name: state,
      display: true
    }))
  })
}

export const filterLocationObjects = (textInput) => {
  return {
    type: FILTER_LOCATION_OBJECTS,
    payload: textInput
  }
}

export const toggleAllLocationChecked = (boolean) => {
  return {
    type: TOGGLE_ALL_LOCATION_CHECKED,
    payload: boolean
  }
}

export const toggleLocationChecked = (state) => {
  return {
    type: TOGGLE_LOCATION_CHECKED,
    payload: state
  }
}

export const addFilterCategory = (category) => dispatch => {
  dispatch(addToCurrentTags(category, 'category'));
  
  dispatch({
    type: ADD_FILTER_CATEGORY,
    payload: category
  })
}

export const addFilterPrice = (priceText) => dispatch => {
  if (!priceText) return
  
  let priceObject = {
    min: null,
    max: null
  }
  
  switch(priceText) {
    case 'Any Price':
      priceObject.min = null;
      priceObject.max = null;
    break;
    case '< $25':
      priceObject.min = 0;
      priceObject.max = 25;
    break;
    case '$25 - $100':
      priceObject.min = 25;
      priceObject.max = 100;
    break;
    case '$100 - $200':
      priceObject.min = 100;
      priceObject.max = 200;
    break;
    case '> $200':
      priceObject.min = 200;
      priceObject.max = null;
    break;
    default:
      priceObject.min = null;
      priceObject.max = null;
    break;
  }
  dispatch(addToCurrentTags(priceText, 'price'));
  dispatch({
    type: ADD_FILTER_PRICE,
    payload: priceObject
  })
}

export const setSearchBarTerm = (searchTerm) => {
  return {
    type: SET_SEARCHBAR_TERM,
    payload: searchTerm
  }
}


const initialState = {
  filters: {
    search: '',
    searchBar: '',
    category: [],
    location: [],
    price: {
      min: null,
      max: null
    },
    currentTags: {
      category: [],
      location: [],
      price: []
    }
  }
}

export default function userFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FILTER_CATEGORY:
      if(state.filters.category.includes(action.payload)) return state
      return {
        ...state,
        filters: {
          ...state.filters,
          category: [...state.filters.category, action.payload]
        }
      }
    case ADD_FILTER_PRICE:
      return {
        ...state,
        filters: {
          ...state.filters,
          price: action.payload
        }
      }
    case ADD_TO_CURRENT_TAGS:
     return  action.payload.type === 'price' ?
       {
        ...state,
        filters: {
          ...state.filters,
          currentTags: {
            ...state.filters.currentTags,
            [action.payload.type]: [action.payload.tag]
          }
        }
      }
      :
       {
        ...state,
        filters: {
          ...state.filters,
          currentTags: {
            ...state.filters.currentTags,
            [action.payload.type]: 
              state.filters.currentTags[action.payload.type].includes(action.payload.tag) ? [...state.filters.currentTags[action.payload.type]] :
              [...state.filters.currentTags[action.payload.type],
               action.payload.tag 
            ]
          }
        }
      }
    case REMOVE_FROM_CURRENT_TAGS:
      if(action.payload.type === 'price') {
        return {
          ...state,
          filters: {
            ...state.filters,
            price: {
              min: null,
              max: null
            },
            currentTags: {
              ...state.filters.currentTags,
              [action.payload.type]: state.filters.currentTags[action.payload.type].filter(tag => tag !== action.payload.tag)
            },

        }

    }} else {
      return {
        ...state,
        filters: {
          ...state.filters,
          currentTags: {
            ...state.filters.currentTags,
            [action.payload.type]: state.filters.currentTags[action.payload.type].filter(tag => tag !== action.payload.tag)
          }
        }
      }
    }
      case ADD_LOCATION_OBJECTS:
        return {
          ...state,
          filters: {
            ...state.filters,
            location: action.payload
        }
      }
      case FILTER_LOCATION_OBJECTS:
        if(!action.payload) return {
          ...state,
          filters: {
            ...state.filters,
            location: state.filters.location.map(state => ({
              ...state,
              display: true
            }))
          }
        }
        return {
          ...state,
          filters: {
            ...state.filters,
            location: state.filters.location.map(state => ({
              ...state,
              display: state.name.toLowerCase().includes(action.payload.toLowerCase())
            }))
          }
        }
      case TOGGLE_ALL_LOCATION_CHECKED: 
        return {
          ...state,
          filters: {
            ...state.filters,
            location: state.filters.location.map(state => ({
              ...state,
              [state.name]: !action.payload
            }))
        }
      }
      case TOGGLE_LOCATION_CHECKED:
        return {
          ...state,
          filters: {
            ...state.filters,
            location: state.filters.location.map(state => ({
              ...state,
              [state.name]: state.name === action.payload ? !state[state.name] : state[state.name]
            }))
        }
      }
      case SET_SEARCHBAR_TERM:
        return {
          ...state,
          filters: {
            ...state.filters,
            search: action.payload
          }
        }
    default:
      return state
  }
}