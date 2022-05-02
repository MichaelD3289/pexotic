import React from 'react'
import './CurrentListing.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import redXIcon from '../../../../assets/icons/red-x-circle-icon.svg'
import greenCheckMark from '../../../../assets/icons/checkmark-circle-icon.svg'
import closeIcon from '../../../../assets/icons/close-icon.svg'
import {useDispatch} from 'react-redux'
import { getShopAccount } from '../../../../redux/reducers/shopDashboardAccount'

function CurrentListing({id, img_url, price, qty, title, category, ...props}) {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = React.useState(false)
  const [deleteListing, setDeleteListing] = React.useState(false)
  const [editListing, setEditListing] = React.useState(false)
  const maxTitleLength = 30
  // adding "..." to the end of the card name if it is too long
  title?.length > maxTitleLength && (title = title.slice(0, maxTitleLength) + '...')

  return (
  
    <div 
      id='shop-listing'
      className={`${qty === 0 ? 'out-of-stock' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >    
       {isHovered && 
       <img 
        src={closeIcon} 
        alt="close icon" 
        className='close-icon large'
        onClick={() => setDeleteListing(true)}
       />} 
        
          <button className='edit-listing-btn' id={isHovered ? 'edit-listing-btn-show' : 'edit-listing-btn-hide'}>Edit Listing</button>

        {deleteListing &&
        <div className='delete-listing-modal'>
          <div className='delete-listing-modal-content'>
            <img src={redXIcon} alt="red x icon" className='red-x-icon-delete'/>
            <h2>Are you sure you want to delete this listing?</h2>
            <div className='delete-listing-modal-btns'>
              <button className='delete-listing-modal-btn' onClick={() => setDeleteListing(false)}>Cancel</button>
              <button className='delete-listing-modal-btn' onClick={() => {
                axios.delete(`/api/listings/${id}`)
                .then(res => {
                  setDeleteListing(false)
                  dispatch(getShopAccount())
                })
                .catch(err => console.log(err))
              }}>Delete</button>
            </div>
          </div>
        </div>}
     
      <img 
        className='shop-listing-img' 
        src={`${img_url}`} 
        alt={title} 
      />
      <h4>{title}</h4>
      <div className='shop-listing-price-qty-container'>
        <h5><span>$</span>{price?.toFixed(2)}</h5>
        <div className='shop-listing-stock-indicator'>
          {qty !== 0 ? 
          <img src={greenCheckMark} 
          alt="green check mark" 
          className='green-check-mark'/> :
          <img src={redXIcon} 
          alt="red X circle icon" 
          className='red-x-circle'/>}
          <p>In Stock</p>
        </div>
      </div>
      <Link className='current-listing-link' to={`/product/listing/${id}`}>Go to Listing</Link>
    </div>
  )
}

export default CurrentListing