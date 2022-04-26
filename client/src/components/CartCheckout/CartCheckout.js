import React from 'react'
import './CartCheckout.css'

import CartInfo from './CartInfo/CartInfo'
import { useSelector } from 'react-redux'

function CartCheckout() {

  const cartQty = useSelector(state => state.userCart.length)

  return (
    <div 
      id='cart-checkout-container'
      className={cartQty > 0 ? '' : 'cart-checkout-container-empty'}
    >
      <CartInfo />
    </div>
  )
}

export default CartCheckout