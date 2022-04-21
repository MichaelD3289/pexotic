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

export const accountCreatedFailure = () => {
  return {
    type: ACCOUNT_CREATED_FAILURE
  }
}

export const resetAccountCreated = () => {
  return {
    type: RESET_ACCOUNT_CREATED_STATUS
  }
}

// reducer function
export default function accountSuccessReducer(state="error", action) {
  switch (action.type) {
    // case statements
    case ACCOUNT_CREATED_SUCCESS:
      return "success"
    case ACCOUNT_CREATED_FAILURE:
      return "error"
    case RESET_ACCOUNT_CREATED_STATUS:
      return "default"
    // default statement
    default:
      return state;
  }
}