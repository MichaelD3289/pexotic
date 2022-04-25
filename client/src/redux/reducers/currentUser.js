// constant type variables
const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER'
const UNVERIFY_USER = 'UNVERIFY_USER'
const VERIFY_USER = 'VERIFY_USER'

// action functions
export const saveCurrentUser = (token) => {
  
  return {
    type: SAVE_CURRENT_USER,
    payload: token
  }
}

export const unVerifyUser= () => {
  return {
    type: UNVERIFY_USER
  }
}

export const verifyUser = () => {
  return {
    type: VERIFY_USER
  }
}

const initialState = {
  verified: false,
  token: ''
}

// reducer function
export default function currentUserReducer(state=initialState, action) {
  switch (action.type) {
    // case statements
    case SAVE_CURRENT_USER:
      return {
        ...state,
        verified: true,
        token: action.payload
      }
    case UNVERIFY_USER:
      return {
        ...state,
        verified: false,
        token: ''
      }
    case VERIFY_USER:
      return {
        ...state,
        verified: true
      }
    // default statement
    default:
      return state;
  }
}