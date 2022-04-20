import React from 'react'
import './PopularListing.css'

import Listing from './Listing'
import OutlineButton from '../Buttons/OutlineButton'

function PopularListings() {
  return (
    <section id='popular-listings'>
      <h2 
      className='popular-listing-title'
      >Popular Listings</h2>
      <div className='popular-listing-container'>
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
      </div>
      <OutlineButton>
        More Listings
      </OutlineButton>
      
    </section>
  )
}

export default PopularListings