// constant type variables
const TOGGLE_ACCOUNT_POP_UP = 'TOGGLE_ACCOUNT_POP_UP'

// action functions
export const toggleAccountPopUp = () => {
  return { type: TOGGLE_ACCOUNT_POP_UP }
}

// reducer function
export default function accountPopUpReducer(state=false, action) {
  switch (action.type) {
    // case statements
    case TOGGLE_ACCOUNT_POP_UP:
      return !state;
    // default statement
    default:
      return state;
  }
}