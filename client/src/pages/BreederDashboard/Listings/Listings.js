import React, {useEffect} from 'react'
import './Listings.css'
import OutlineButton from '../../../components/Buttons/OutlineButton'
import CurrentListing from './CurrentListings/CurrentListing'

function Listings() {

  useEffect(() => {
    document.title = 'Pexotic | Breeder | Listings'
  })

  return (
    <main id='dashboard-listing-page'>
      <OutlineButton
        style={{marginLeft: 'auto'}}
      >Add Listing</OutlineButton>
      <section className='current-listings'>
        <h2 className='current-listings-title'>
          Current Listings</h2>
          <div className='current-listings-container'>
            <CurrentListing />
          </div>
      </section>
    </main>
  )
}

export default Listings