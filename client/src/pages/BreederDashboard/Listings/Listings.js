import React, {useEffect, useState} from 'react'
import './Listings.css'
import OutlineButton from '../../../components/Buttons/OutlineButton'
import CurrentListing from './CurrentListings/CurrentListing'
import AddListing from './AddListing/AddListing'
import { useDispatch, useSelector } from 'react-redux'
import { getShopAccount } from '../../../redux/reducers/shopDashboardAccount'

function Listings() {
  const [showAddListing, setShowAddListing] = useState(false)
  const listings = useSelector(state => state.shopDashBoardAccount.shopsListings)
  
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Pexotic | Breeder | Listings'
    dispatch(getShopAccount())
  }, [])

  return (
    <main id='dashboard-listing-page'>
      <AddListing 
        show={showAddListing} 
        hide={setShowAddListing}
      />
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
          {listings?.length > 0 ? 'Current Listings' : 'No Listings'}
          </h2>
          <div className='current-listings-container'>
            {listings.map(listing => (
            <CurrentListing 
              key={listing.listing_id + listing.listing_name}
              id={listing.listing_id}
              title={listing.listing_name}
              qty={listing.qty}
              price={listing.price}
              category={listing.category_name}
              img_url={listing.main_photo}
            />
            ))}
          </div>
      </section>
    </main>
  )
}

export default Listings