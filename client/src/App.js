import React, { useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Routes
import Home from './pages/Home/Home'
import BreederShop from './pages/BreederShop/BreederShop'
import UserProfile from './pages/UserProfile/UserProfile'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Listing from './pages/Listing/Listing'
import ItemSearch from './pages/ItemSearch/ItemSearch'
import BreederDashboard from './pages/BreederDashboard/BreederDashboard'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { useDispatch } from 'react-redux'
import { saveCurrentUser, unVerifyUser, verifyUser } from './redux/reducers/currentUser'

function App() {
const dispatch = useDispatch()
  // check local storage for token
   // if token exists, set it to state
    // if token does not exist, set state to null
    // check token against server to verify
    // if token is valid, set state verified to true
    // if token is invalid, set state verified to false
    // if token is invalid, set state token to null
    // set axios headers to include token

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    console.log(toString(token))
    if(!token) {
      console.log('no token')
      dispatch(unVerifyUser())
      return
    }
    console.log('token exists')
    axios.get('/api/users/verify', {
      headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
      console.log(res)
      dispatch(verifyUser())
      dispatch(saveCurrentUser(token))
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`
    })
    .catch(err => {
      console.log(err)
      dispatch(unVerifyUser())
      localStorage.removeItem('access_token')
    })
  }, [dispatch])

  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/breeder/shop/:id/:name' element={<BreederShop />} />
          <Route path='/breeder/dashboard/:id/:name' element={<BreederDashboard />} />
          <Route path='/user/profile/:id' element={<UserProfile />} />
          <Route path='/checkout/cart/:id' element={<ShoppingCart />} />
          <Route path='/product/listing/:id' element={<Listing />} />
          <Route path='/product/search' element={<ItemSearch />} />
      </Routes>
        <Footer />
      </div>

     
    </Router>
  )
}

export default App