import React from 'react'
import './Listing.css'
import listingImg from '../../assets/placeholders/listing-placeholder.jpg'

function Listing() {
  return (
    <div className='popular-listing-item'>
          <img className='popular-listing-img' src={listingImg} alt="" />
        </div>
  )
}

export default Listing