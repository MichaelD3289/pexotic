import React from 'react'
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

function App() {
  return (
    <Router>
      <div className='app'>
        <h1>App</h1>
      </div>

      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/breeder/shop/:id/:name' element={<BreederShop />} />
          <Route path='/breeder/dashboard/:id/:name' element={<BreederDashboard />} />
          <Route path='/user/profile/:id' element={<UserProfile />} />
          <Route path='/checkout/cart/:id' element={<ShoppingCart />} />
          <Route path='/product/listing/:id' element={<Listing />} />
          <Route path='/product/search' element={<ItemSearch />} />
      </Routes>
    </Router>
  )
}

export default App