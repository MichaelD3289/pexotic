import React from 'react'
import './ShopListings.css'
import Listing from './Listing'

function ShopListings({shopsListings, searchTerm, ...props}) {
  const [filteredListings, setFilteredListings] = React.useState(shopsListings);

  React.useEffect(() => {
    setFilteredListings(shopsListings.filter(listing => {
      if (searchTerm === 'All') return true;
      return listing.category_name.toLowerCase() === searchTerm.toLowerCase();
    }))
    
  }, [searchTerm, shopsListings])


  return (
    <section id="shop-listings-container">
      <div className='listing-container'>
        {filteredListings.map((listing) => (
          <Listing
            key={listing.listing_id}
            id={listing.listing_id}
            img_url={listing.main_photo}
            price={listing.price}
            qty={listing.qty}
            title={listing.listing_name}
            category={listing.category_name}
            />
        ))}
          
      </div>
      
    </section>
  )
}

export default ShopListings