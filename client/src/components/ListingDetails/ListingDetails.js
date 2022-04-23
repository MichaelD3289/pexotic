import React from 'react'
import './ListingDetails.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import ListingPhotoHolder from './ListingPhotoHolder/ListingPhotoHolder'
import ListingInfoHolder from './ListingInfoHolder/ListingInfoHolder'

function ListingDetails() {

  const listing = useSelector(state => state.currentListing)

  const { id, description } = listing

  return (
    <section id="listing-details">
      <div className="listing-details-container">
        <ListingPhotoHolder />
        <ListingInfoHolder />
      </div>

      <div className="listing-description-container">
        <h3 className='description-title'>Decription:</h3>
        <p className='description-content'>{description}</p>
      </div>

    </section>
  )
}

export default ListingDetails