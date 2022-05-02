import React, {useEffect, useState} from 'react'
import './Listings.css'
import OutlineButton from '../../../components/Buttons/OutlineButton'
import CurrentListing from './CurrentListings/CurrentListing'
import AddListing from './AddListing/AddListing'

function Listings() {
  const [showAddListing, setShowAddListing] = useState(false)

  useEffect(() => {
    document.title = 'Pexotic | Breeder | Listings'
  })

  return (
    <main id='dashboard-listing-page'>
      <AddListing show={showAddListing} hide={setShowAddListing} />
      <OutlineButton
        style={{marginLeft: 'auto'}}
        onClick={() => {
          setShowAddListing(true)
        }}
      >
        Add Listing
      </OutlineButton>
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