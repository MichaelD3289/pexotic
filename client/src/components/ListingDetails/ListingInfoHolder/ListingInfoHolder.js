import React, { useEffect } from 'react'
import './ListingInfoHolder.css'
import { Link } from 'react-router-dom'

import greenCheckMark from '../../../assets/icons/checkmark-circle-icon.svg'
import redXIcon from '../../../assets/icons/red-x-circle-icon.svg'
import OutlineButton from '../../Buttons/OutlineButton'
import { useSelector, useDispatch } from 'react-redux'
import { addItemToCart } from '../../../redux/reducers/userCart'

function ListingInfoHolder() {
  const [qtyInput, setQtyInput] = React.useState(1)
  const dispatch = useDispatch();
  const listing = useSelector(state => state.currentListing)
  
  let { id, category, currentDiscount, price, qty, shippingPrice, speciesId, name, shopLogo, shopName, sellerId } = listing

  
  return (
    <div className='listing-info-holder'>
      <div className='listing-info-holder-top'>
      <div className='listing-logo-container'>
        {shopLogo && 
          <Link 
            to={`/breeder/shop/${sellerId}/${shopName.replace(/\s+/g, '-').toLowerCase()}`}
            className='listing-logo-link'
            >
            <img 
            src={`/static/${shopLogo.replace('jpg', 'png')}`} className='listing-logo' 
            alt={shopName}
            />
          </Link>
          }
      </div>

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
      </div>
      <div className='listing-info-holder-bottom'>

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
              <span className="dollar-sign">$ </span>
               {price && price.toFixed(2)}
               </h2>
            </div>
          <div className='listing-qty-container'>
            <p>Quantity</p>
            <input 
            type="number" 
            min="1" 
            max={qty} 
            value={qtyInput} 
            id="quantity"
            onChange={(e) => setQtyInput(e.target.value)}
            />
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
          onClick={() => dispatch(addItemToCart(id, qtyInput))}
          >
            {qty === 0 ? 'Out of Stock' : 'Add to Cart'}
          </OutlineButton>
        </div>

      </div>
      </div>
    </div>
  )
}

export default ListingInfoHolder