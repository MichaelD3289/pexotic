import React from 'react'
import './LocationItem.css'

import { useDispatch } from 'react-redux'
import { toggleLocationChecked } from '../../../../redux/reducers/userFilters'

function LocationItem({state, checked, displayItem, ...props}) {
  const dispatch = useDispatch()
  const display = displayItem ? 'flex' : 'none'

  return (
    <li 
    key={state}
    className='location-filter-ul-item'
    style={{
      display
    }}
  >
    <input
      type='checkbox'
      className='location-filter-li-input'
      id={state}
      name='state'
      value={state}
      checked={checked}
      onChange={(e) => {
        dispatch(toggleLocationChecked(e.target.value))
    }}
    />
    <label className='state-label' htmlFor={state}>{state}</label>
  </li>
  )
}

export default LocationItem