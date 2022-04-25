import React from 'react'
import './ShopListings.css'
import Listing from './Listing'

function ShopListings({shopsListings, ...props}) {
  return (
    <section id="shop-listings-container">
      <div className='listing-container'>
        <Listing />
        <Listing />
        <Listing />
      </div>
      
    </section>
  )
}

export default ShopListings