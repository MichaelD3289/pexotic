// constant type variables
const TOGGLE_FILTER_POP_UP = 'TOGGLE_FILTER_POP_UP'

// action functions
export const toggleFilterPopUp = () => {
  return { type: TOGGLE_FILTER_POP_UP }
}

// reducer function
export default function filterPopUpReducer(state=false, action) {
  switch (action.type) {
    // case statements
    case TOGGLE_FILTER_POP_UP:
      return !state;
    // default statement
    default:
      return state;
  }
}