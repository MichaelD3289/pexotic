// constant type variables
const ACCOUNT_CREATED_SUCCESS = 'ACCOUNT_CREATED_SUCCESS'
const ACCOUNT_CREATED_FAILURE = 'ACCOUNT_CREATED_FAILURE'
const RESET_ACCOUNT_CREATED_STATUS = 'RESET_ACCOUNT_CREATED_STATUS'

// action functions
export const accountCreatedSuccess = () => {
  return {
    type: ACCOUNT_CREATED_SUCCESS
  }
}

export const accountCreatedFailure = (message) => {
  
  const keyword = message.split(' ')[0]
  let messageUsed;

  switch(keyword) {
    case 'email':
      messageUsed = 'Email already exists'
      break;
    case 'username':
      messageUsed = 'Username already exists'
      break;
      case 'password':
        messageUsed = message
    default:
      messageUsed = 'Something went wrong, please try again'
  }

  return {
    type: ACCOUNT_CREATED_FAILURE,
    payload: messageUsed
  }
}

export const resetAccountCreated = () => {
  return {
    type: RESET_ACCOUNT_CREATED_STATUS
  }
}

const initialState = {
  type: '',
  message: ''
}

// reducer function
export default function accountSuccessReducer(state=initialState, action) {
  switch (action.type) {
    // case statements
    case ACCOUNT_CREATED_SUCCESS:
      return {
        type: "success",
        message: ''
      }
    case ACCOUNT_CREATED_FAILURE:
      return {
        type: "error",
        message: action.payload
      }
    case RESET_ACCOUNT_CREATED_STATUS:
      return {
        type: "",
        message: ''
      }
    // default statement
    default:
      return state;
  }
}