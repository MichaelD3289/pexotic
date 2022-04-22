import React from 'react'
import './ListingDetails.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import ListingPhotoHolder from './ListingPhotoHolder/ListingPhotoHolder'
import ListingInfoHolder from './ListingInfoHolder/ListingInfoHolder'

function ListingDetails() {
  return (
    <section id="listing-details">
      <div className="listing-details-container">
        <ListingPhotoHolder />
        <ListingInfoHolder />
      </div>

      <div className="listing-description-container">
        <h3 className='description-title'>Decription:</h3>
        <p className='description-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In fermentum et sollicitudin ac. Sed elementum tempus egestas sed sed risus pretium quam vulputate. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. Feugiat nibh sed pulvinar proin. Sit amet aliquam id diam maecenas. Orci eu lobortis elementum nibh. Et pharetra pharetra massa massa ultricies mi. Faucibus in ornare quam viverra. Tellus id interdum velit laoreet. Viverra vitae congue eu consequat ac felis donec et. Arcu felis bibendum ut tristique et egestas. Lorem ipsum dolor sit amet. Nisi scelerisque eu ultrices vitae auctor. Enim nunc faucibus a pellentesque. Tincidunt eget nullam non nisi est sit amet.

Suspendisse sed nisi lacus sed. Leo integer malesuada nunc vel risus commodo viverra maecenas. Porttitor leo a diam sollicitudin tempor id. Vitae proin sagittis nisl rhoncus mattis. A diam sollicitudin tempor id eu nisl. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Lacus vestibulum sed arcu non odio euismod. Vitae proin sagittis nisl rhoncus mattis rhoncus. Viverra vitae congue eu consequat ac felis donec et. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Suspendisse sed nisi lacus sed viverra tellus in hac. Turpis egestas integer eget aliquet nibh. A lacus vestibulum sed arcu non odio euismod lacinia at. At augue eget arcu dictum varius duis at. Id nibh tortor id aliquet. Pellentesque dignissim enim sit amet venenatis urna cursus. Orci dapibus ultrices in iaculis nunc sed augue. Quis auctor elit sed vulputate mi sit.</p>
      </div>

    </section>
  )
}

export default ListingDetails