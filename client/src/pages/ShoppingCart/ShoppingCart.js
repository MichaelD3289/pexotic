import React from 'react'
import './ShoppingCart.css'

import CartListings from '../../components/CartListings/CartListings'
import CartCheckout from '../../components/CartCheckout/CartCheckout'

import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../redux/reducers/userCart'

function ShoppingCart() {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.userCart)
  
  React.useEffect(() => {
    document.title = 'Pexotic | Checkout | Cart'
    window.scrollTo(0, 0)
  }, [cart])

  return (
    <main id="shopping-cart-page">

      <div className='shopping-cart-page-left'>
        <div className='shopping-cart-title-container'>
          <h1 className='shopping-cart-title'>Shopping Cart</h1>
          {cart.length > 0 && 
          <button 
            className='clear-cart-btn'
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>}
        </div>
        {cart.length === 0 && 
        <h2 className='empty-cart'>
          Your cart is empty
        </h2>}
        {cart.length > 0 && cart.map(listing => (
          <CartListings 
            key={listing.listing_id + listing.listing_name + listing.cart_item_id}
            cart={listing} 
          />
        ) )}
      </div>

      <div className='shopping-cart-page-right'>
        <CartCheckout />
      </div>

    </main>
  )
}

export default ShoppingCart