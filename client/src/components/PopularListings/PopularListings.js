import React from 'react'
import './PopularListing.css'

import Listing from './Listing'
import OutlineButton from '../Buttons/OutlineButton'

import {useSelector} from 'react-redux'

function PopularListings() {

  const popularListings = useSelector(state => state.popularListings)

  return (
    <section id='popular-listings'>
      <h2 
      className='popular-listing-title'
      >Popular Listings</h2>
      <div className='popular-listing-container'>

        {popularListings.map(listing => (
          <Listing
          key={listing.listing_id}
          id={listing.listing_id}
          title={listing.listing_name}
          price={listing.price}
          qty={listing.qty}
          main_photo={listing.main_photo}
          isFavorite={listing.isFavorite}
          />
        ))}
      </div>
      <OutlineButton>
        More Listings
      </OutlineButton>
      
    </section>
  )
}

export default PopularListings