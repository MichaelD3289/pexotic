import React from 'react'
import './ListingInfoHolder.css'

import greenCheckMark from '../../../assets/icons/checkmark-circle-icon.svg'
import redXIcon from '../../../assets/icons/red-x-circle-icon.svg'
import OutlineButton from '../../Buttons/OutlineButton'
import { useSelector } from 'react-redux'


function ListingInfoHolder() {
  let {
    category, currentDiscount, price, qty, shippingPrice, speciesId, name
  } = useSelector(state => state.currentListing)
  

  return (
    <div className='listing-info-holder'>
      <div className='listing-logo-container'>Logo</div>

      <div className='listing-guarantees-container'>
        <div className='live-arrival'>
          <h2>Live Arrival</h2>
          <h2>Guarantee</h2>
        </div>
        <div className='overnight-shipping'>
        <h2>Overnight</h2>
          <h2>Shipping</h2>
        </div>
      </div>

      <div className='listing-title-container'>
        <h2>{name}</h2>
      </div>

      <div className='listing-qty-stock-container'>
      {qty !== 0 ? <img src={greenCheckMark} alt="green check mark" className='green-check-mark'/> :
      <img src={redXIcon} alt="red X circle icon" className='red-x-circle'/>      
    }
        
        <p>In Stock</p>
      </div>

      <div className='listing-checkout-container'>

        <div className='listing-price-qty-container'>
          <div className='listing-price-container'>
            <h2>
              <span class="dollar-sign">$ </span>
               {price}
               </h2>
            </div>
          <div className='listing-qty-container'>
            <p>Quantity</p>
            <input type="number" min="1" max={qty} defaultValue="1" id="quantity" />
            </div>
        </div>

        <div className='listing-btns-container'>
          <OutlineButton 
          className='outline-btn green'
          style={{borderColor: "#3CA836"}}
          >
            Care Sheets
          </OutlineButton>
          <OutlineButton
          disabled={qty === 0}
          >
            {qty === 0 ? 'Out of Stock' : 'Add to Cart'}
          </OutlineButton>
        </div>

      </div>
    </div>
  )
}

export default ListingInfoHolder