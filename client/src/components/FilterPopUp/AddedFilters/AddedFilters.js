import React from 'react'
import './AddedFilters.css'

import { useSelector, useDispatch } from 'react-redux'
import { removeFromCurrentTags } from '../../../redux/reducers/userFilters'

function AddedFilters() {
  const dispatch = useDispatch()
  const {currentTags: {category, location, price}} = useSelector(state => state.userFilters.filters)
  
  return (
    <div className='added filters'>
            <h3 className='filter-title added'>
              Added Filters
            </h3>
 
              <ul className='added-filters-contaner-ul'>
                  {category[0] && category.map((tag, index) => (
                    <li className='added-filter-list-item' key={tag + index}
                    value='category'
                    onClick={() => dispatch(removeFromCurrentTags(tag, 'category'))}
                    >
                      {tag}
                    </li>
                  ))}
                  {location[0] &&  location.map((tag, index) => (
                    <li className='added-filter-list-item' key={tag + index}
                    value='location'
                    onClick={() => dispatch(removeFromCurrentTags(tag, 'location'))}
                    >
                      {tag}
                    </li>
                  ))}
                  {price[0] && price.map((tag, index) => (
                    <li className='added-filter-list-item' key={tag + index}
                    value='price'
                    onClick={() => dispatch(removeFromCurrentTags(tag, 'price'))}
                    >
                      {tag}
                    </li>
                  ))}
              </ul>

          </div>
  )
}

export default AddedFilters