import React from 'react'
import './SearchListings.css'
import Listing from './Listing'

import { useSelector } from 'react-redux'

function SearchListings() {
  const searchPageListings = useSelector(state => state.searchPageListings)


  return (
    <section id='search-listings'>
      <div className='search-listings-listing-container'>
       
        {searchPageListings.map(listing => (
          <Listing key={listing.id} listing={listing} />
        ))}

      </div>
    </section>
  )
}

export default SearchListings