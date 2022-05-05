import React from 'react'
import './ProfileFavoriteListings.css'
 
import Listing from './Listing'



function ProfileFavoriteListings(props) {

  
  return (
    <section id='profile-favorite-listings'>
      <h2 
      className='profile-favorite-listings-title'
      >Favorite Listings</h2>
      <div className='profile-favorite-listings-container'>

        {props.favoriteListings.map(listing => (
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
      
    </section>
  )
}

export default ProfileFavoriteListings