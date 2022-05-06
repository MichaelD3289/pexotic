import React from 'react'
import './SearchListings.css'
import Listing from './Listing'

import { useSelector } from 'react-redux'

function SearchListings() {
  const searchPageListings = useSelector(state => state.searchPageListings)


  return (
    <section id='search-listings'>
      <div className='search-listings-listing-container'>
        {searchPageListings.length === 0 && <h2 className='no-listings-found'>No Listings Found.</h2>}
        {searchPageListings.map(listing => (
          <Listing key={listing.listing_id + 'search-listing'} listing={listing} />
        ))}

      </div>
    </section>
  )
}

export default SearchListings