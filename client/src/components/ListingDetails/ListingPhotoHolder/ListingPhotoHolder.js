import React from 'react'
import './ListingPhotoHolder.css'

import AltImageContainer from './AltImageContainer/AltImageContainer'
import MainProductPhoto from './MainProductPhoto/MainProductPhoto'

function ListingPhotoHolder() {
  return (
    <div className='listing-photo-gallery'>
      <AltImageContainer />
      <MainProductPhoto />
    </div>
  )
}

export default ListingPhotoHolder