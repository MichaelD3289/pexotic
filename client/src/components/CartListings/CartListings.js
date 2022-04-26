import React from 'react'
import './CartListings.css'
import {Link} from 'react-router-dom'
import closeIcon from '../../assets/icons/close-icon.svg'

import { useDispatch } from 'react-redux'
import { updateItemInCart, removeItemFromCart, clearCart } from '../../redux/reducers/userCart'

function CartListings(props) {
  const dispatch = useDispatch()
  const [updated, setUpdated] = React.useState(false)
  const { cart_item_id, listing_id, listing_name, main_photo, price, qty, seller_id, shipping_price } = props.cart
  
  const [isHovered, setisHovered] = React.useState(false)

  const [qtyInput, setQtyInput] = React.useState(qty)
  


   return (
     <>
    <div 
      className="cart-listing-container"
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      {isHovered &&
        <img 
        src={closeIcon} 
        alt="x icon to close pop up" 
        className='close-icon'
        onClick={() => {
          dispatch(removeItemFromCart(cart_item_id))
        }}
        />}

      <div className="cart-listing-left">
        <Link to={`/product/listing/${listing_id}`}>
        <img 
          className="cart-listing-image" 
          src={`/static/${main_photo}`} 
          alt={listing_name} 
        /></Link>
      </div>

      <div className="cart-listing-right">
        <h2 className='cart-listing-title'>{listing_name}</h2>
        <h3 className='cart-listing-price'><span>$</span>{price}</h3>
        <p className='cart-listing-shipping-price'>+ <span>$</span>{shipping_price} shipping</p>

        <div className='qty-total-price-container'>
          <div className='cart-listing-qty-container'>
            <p>Qty</p>
            <input 
              className='cart-listing-container-qty-input'
              id={`qty-input-${listing_id}`}
              name={`qty-input-${listing_id}`}
              type='number'
              min='1'
              value={qtyInput}
              onChange={(e) => setQtyInput(e.target.value)}
            />
            <button 
             className='cart-listing-update-btn'
             onClick={() => {
               dispatch(updateItemInCart(cart_item_id, qtyInput))
              }}
            >Update</button>
          </div>
          <h3 className='total-price'>$ {((price * qty) + shipping_price).toFixed(2)}</h3>
        </div>

      </div>

    </div>
    <div className='cart-listing-line'></div>
    </>
  )
}

export default CartListings