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
import SearchPage from './pages/Search/SearchPage'
import BreederDashboard from './pages/BreederDashboard/BreederDashboard'
import Dashboard from './pages/BreederDashboard/Dashboard/Dashboard'
import Listings from './pages/BreederDashboard/Listings/Listings'
import Messages from './pages/BreederDashboard/Messages/Messages'
import ShopAccount from './pages/BreederDashboard/ShopAccount/ShopAccount'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { useDispatch, useSelector } from 'react-redux'
// import { saveCurrentUser, unVerifyUser, verifyUser } from './redux/reducers/currentUser'
// import { getAllFavorites } from './redux/reducers/allFavorites'
// import { getUserCart } from './redux/reducers/userCart'

import LogInPopUp from './components/LogInPopUp/LogInPopUp'
import useVerifyUser from './hooks/useVerifyUser'


function App() {
const {verify, token} = useVerifyUser()
useEffect(() => {
  verify()
}, [token])
// const token = useSelector(state => state.currentUser.token) || localStorage.getItem('access_token') || null

// const dispatch = useDispatch()

//   useEffect(() => {

    
//     if(!token) {
//       dispatch(unVerifyUser())
//       return
//     }
    
//     axios.get('/api/users/verify', {
//       headers: {
//         authorization: `Bearer ${token}`
//         }
//     })
//     .then(res => {
//       console.log(res.data)
//       axios.defaults.headers.common['authorization'] = `Bearer ${token}`
//       dispatch(verifyUser())
//       dispatch(saveCurrentUser(token, res.data))
//       dispatch(getAllFavorites())
//       dispatch(getUserCart())
//     })
//     .catch(err => {
//       dispatch(unVerifyUser())
//       localStorage.removeItem('access_token')
//     })
//   }, [dispatch, token])

  const popUpToggle = useSelector(state => state.accountPopUp);

  return (
    <Router>
      <div className='app'>
        <Header />
        <LogInPopUp show={popUpToggle} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/breeder/shop/:id/:name' element={<BreederShop />} />
          <Route path='/breeder/dashboard' element={<BreederDashboard />}>
            <Route path='/breeder/dashboard/main' element={<Dashboard />} />
            <Route path='/breeder/dashboard/listings' element={<Listings />} />
            <Route path='/breeder/dashboard/messages' element={<Messages />} />
            <Route path='/breeder/dashboard/account' element={<ShopAccount />} />
          </Route>
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/checkout/cart' element={<ShoppingCart />} />
          <Route path='/product/listing/:id' element={<Listing />} />
          <Route path='/search' element={<SearchPage />} />
      </Routes>
        <Footer />
      </div>

     
    </Router>
  )
}

export default App