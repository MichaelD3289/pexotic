import React from 'react'
import './AltImageContainer.css'

import { useSelector, useDispatch } from 'react-redux'
import { setMainListingPhoto } from '../../../../redux/reducers/currentListing'

function AltImageContainer() {

  const dispatch = useDispatch()

  const listing = useSelector(state => state.currentListing)

  const { photoUrls: {altImages, mainPhoto}, name } = listing
  
  return (

    <div className='alt-image-container'>

      {altImages.filter(img => img).map(image => (
        <div
        key={image} 
        className={`alt-image-container-item${image === mainPhoto ? ' main-photo' : ''}`}
        onClick={() => dispatch(setMainListingPhoto(image))}
        >
          <img src={`${image}`} className='alt-image' alt={name}/>
        </div>
      )) 
      }
     
    </div>
  )
}

export default AltImageContainer