import React from 'react'
import './ShopCategoriesBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../../redux/reducers/currentShop'

function ShopCategoriesBar({shopCategories, ...props}) {
  const dispatch = useDispatch()
  const {searchCategory} = useSelector(state => state.currentShop)
  
  return (
    <div id='shop-categories-bar'>
      <h2 className='shop-categories-bar-title'>Categories</h2>
      <ul className='shop-categories-list'>
        <li 
          className={'shop-category-item all' + (searchCategory === 'All' ? ' active' : '')} 
          name='All'
          onClick={() => dispatch(setSearchTerm('All'))}
        >
          All
        </li>
        {shopCategories.map((category) => (
          <li 
          className={'shop-category-item' + (searchCategory === category ? ' active' : '')}
          key={category}
          name={category}
          onClick={() => dispatch(setSearchTerm(category))}
          >
            {category}
          </li>))}
        
      </ul>
    </div>
  )
}

export default ShopCategoriesBar