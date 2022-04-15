import React from 'react'
import './CartIcon.css'
import cartIcon from '../../assets/icons/cart-icon.svg'

function CartIcon() {
  return (
    <div className='cart-icon-container'>
            <div className='cart-icon-hover'>
              <img className='cart-icon' src={cartIcon} alt="cart icon" />
            </div>
            <div className='cart-item-count'>1</div>
          </div>
  )
}

export default CartIcon