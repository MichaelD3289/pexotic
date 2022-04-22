import React from 'react'
import './Listing.css'

import ListingDetails from '../../components/ListingDetails/ListingDetails'
import BreakLine from '../../components/BreakLine/BreakLine'

function Listing() {
  return (
    <main id="listing-page">
      <ListingDetails />
      <BreakLine />
    </main>
  )
}

export default Listing