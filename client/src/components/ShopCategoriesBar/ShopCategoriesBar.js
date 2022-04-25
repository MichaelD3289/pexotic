import React from 'react'
import './ShopCategoriesBar.css'

function ShopCategoriesBar({shopCategories, ...props}) {
  return (
    <div id='shop-categories-bar'>
      <h2 className='shop-categories-bar-title'>Categories</h2>
      <ul className='shop-categories-list'>
        {shopCategories.map((category) => (
          <li className='shop-category-item' key={category}>{category}</li>))}
        
      </ul>
    </div>
  )
}

export default ShopCategoriesBar