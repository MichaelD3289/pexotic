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

import { useDispatch, useSelector } from 'react-redux'
import { saveCurrentUser, unVerifyUser, verifyUser } from './redux/reducers/currentUser'
import { getAllFavorites } from './redux/reducers/allFavorites'
import { getUserCart } from './redux/reducers/userCart'

import LogInPopUp from './components/LogInPopUp/LogInPopUp'

function App() {

const token = useSelector(state => state.currentUser.token) || localStorage.getItem('access_token') || null

const dispatch = useDispatch()

  useEffect(() => {

    
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
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`
      dispatch(verifyUser())
      dispatch(saveCurrentUser(token))
      dispatch(getAllFavorites())
      dispatch(getUserCart())
    })
    .catch(err => {
      dispatch(unVerifyUser())
      localStorage.removeItem('access_token')
    })
  }, [dispatch, token])

  const popUpToggle = useSelector(state => state.accountPopUp);

  return (
    <Router>
      <div className='app'>
        <Header />
        {popUpToggle && <LogInPopUp />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/breeder/shop/:id/:name' element={<BreederShop />} />
          <Route path='/breeder/dashboard/:id/:name' element={<BreederDashboard />} />
          <Route path='/user/profile/:id' element={<UserProfile />} />
          <Route path='/checkout/cart' element={<ShoppingCart />} />
          <Route path='/product/listing/:id' element={<Listing />} />
          <Route path='/product/search' element={<ItemSearch />} />
      </Routes>
        <Footer />
      </div>

     
    </Router>
  )
}

export default App