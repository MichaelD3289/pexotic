// constant type variables
const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER'
const UNVERIFY_USER = 'UNVERIFY_USER'
const VERIFY_USER = 'VERIFY_USER'

// action functions
export const saveCurrentUser = (token,user) => {
  console.log(user)
  return {
    type: SAVE_CURRENT_USER,
    payload: {
      token,
      username: user.username,
      isVendor: user.isVendor,
    }
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
  token: '',
  userInfo: {
    username: '',
    isVendor: false,
  }
}

// reducer function
export default function currentUserReducer(state=initialState, action) {
  switch (action.type) {
    // case statements
    case SAVE_CURRENT_USER:
      return {
        ...state,
        verified: true,
        token: action.payload.token,
        userInfo: {
          username: action.payload.username,
          isVendor: action.payload.isVendor,
        }
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