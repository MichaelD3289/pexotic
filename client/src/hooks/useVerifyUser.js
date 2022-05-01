import React, {useEffect} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { saveCurrentUser, unVerifyUser, verifyUser, getProfileImg } from '../redux/reducers/currentUser'
import { getAllFavorites } from '../redux/reducers/allFavorites'
import { getUserCart } from '../redux/reducers/userCart'

function useVerifyUser() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.currentUser.token) || localStorage.getItem('access_token') || null
  
  const verify = () => {

    
    if(!token) {
      dispatch(unVerifyUser())
      return
    }
    
    axios.get('/api/users/verify', {
      headers: {
        authorization: `Bearer ${token}`
        }
    })
    .then(res => {
      console.log(res.data)
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`
      dispatch(verifyUser())
      dispatch(saveCurrentUser(token, res.data))
      dispatch(getAllFavorites())
      dispatch(getUserCart())
      dispatch(getProfileImg())
      localStorage.setItem('access_token', res.data.token)
    })
    .catch(err => {
      dispatch(unVerifyUser())
      localStorage.removeItem('access_token')
    })
  }

  return {verify, token}
}

export default useVerifyUser