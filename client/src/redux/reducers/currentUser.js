import axios from 'axios'

// constant type variables
const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER'
const UNVERIFY_USER = 'UNVERIFY_USER'
const VERIFY_USER = 'VERIFY_USER'
const GET_PROFILE_IMG = 'GET_PROFILE_IMG'

// action functions
export const saveCurrentUser = (token,user) => {
  console.log(user)
  return {
    type: SAVE_CURRENT_USER,
    payload: {
      token,
      username: user.username,
      isVendor: user.isVendor,
      profilePic: user.profilePic,
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

export const getProfileImg = () => dispatch => {
  axios.get('/api/user/profilePic')
  .then(res => {
    dispatch({
      type: GET_PROFILE_IMG,
      payload: res.data.profile_img
      })
  })
  .catch(err => console.log(err))

}

const initialState = {
  verified: false,
  token: '',
  userInfo: {
    username: '',
    isVendor: false,
    profilePic: '',
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
          profilePic: ""
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
    case GET_PROFILE_IMG:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          profilePic: action.payload
        }
      }
    // default statement
    default:
      return state;
  }
}