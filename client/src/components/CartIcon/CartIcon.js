import React from 'react'
import './CartIcon.css'
import cartIcon from '../../assets/icons/cart-icon.svg'

import {useSelector} from 'react-redux'

function CartIcon() {

  const cart = useSelector(state => state.userCart)
  const numberOfItems = cart.reduce((acc, item) => {
    return acc + item.qty
    }, 0)
    
  return (
    <div className='cart-icon-container'>
            <div className='cart-icon-hover'></div>
              <img className='cart-icon' src={cartIcon} alt="cart icon" />
            
            {numberOfItems !== 0 && 
            <div 
            className='cart-item-count'
            >
              {numberOfItems}
            </div>}
          </div>
  )
}

export default CartIcon