import React from 'react'
import './LocationItem.css'

import { states } from '../../../../data/content/home-page'

function LocationItem({state, checked, setChecked, displayItem, ...props}) {

  const display = displayItem ? 'flex' : 'none'
  console.log(state, display)
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
        setChecked(prev => {
          return prev.map(item => {
            if (item.name === e.target.value) {
              return {
                ...item,
                [e.target.value]: e.target.checked
              }
            }
            return item
          })
      })}}
    />
    <label className='state-label' htmlFor={state}>{state}</label>
  </li>
  )
}

export default LocationItem