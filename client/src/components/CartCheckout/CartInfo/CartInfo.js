import React from 'react'
import './CartInfo.css'
import OutlineButton from '../../Buttons/OutlineButton'

import { useSelector } from 'react-redux'

function CartInfo() {

  const cart = useSelector(state => state.userCart)
  const subtotal = cart.reduce((acc, item) => {
    return acc + item.qty * item.price
  }, 0)
  const shipping = cart.reduce((acc, item) => {
    return acc + item.shipping_price
  }, 0)
  const total = subtotal + shipping


  return (
    <div id='cart-checkout-info'>
        <div className='cart-checkout-subtotal-container'>
          <h2 className='cart-checkout-info-title'>Subtotal</h2>
          <h3 className='cart-checkout-info-price'><span>$</span>{subtotal && subtotal.toFixed(2)}</h3>
        </div>

        <div className='cart-checkout-shipping-container'>
          <h2 className='cart-checkout-info-title shipping'>Shipping</h2>
          <h3
          className='cart-checkout-info-price shipping'><span>$</span>{shipping && shipping.toFixed(2)}</h3>
        </div>

        <div className='cart-listing-line'></div>

        <div className='cart-checkout-total-container'>
          <h2 className='cart-checkout-info-title total'>Total</h2>
          <h3
          className='cart-checkout-info-price total'><span>$</span>{total && total.toFixed(2)}</h3>
        </div>
        <OutlineButton
          className='outline-btn green'
          style={cart.length > 0 ? {
            borderColor: "#3CA836",
            width: "100%",
            height: "40px",
            boxShadow: "inset 0 0 30px #3CA83680",
          } : {width: "100%", height: "40px"}}
          disabled={cart.length === 0}
        >Checkout</OutlineButton>
      </div>
  )
}

export default CartInfo