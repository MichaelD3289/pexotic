import React from 'react'
import './MainProductPhoto.css'

import { useSelector } from 'react-redux'

function MainProductPhoto() {

  const listing = useSelector(state => state.currentListing)

  const { photoUrls, name } = listing

  return (
    <div className='main-photo-container'>
      <img src={`/static/${photoUrls.mainPhoto}`} className='main-photo' alt={name}/>
    </div>
  )
}

export default MainProductPhoto