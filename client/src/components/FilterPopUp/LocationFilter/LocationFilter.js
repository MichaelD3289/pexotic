import React from 'react'
import './LocationFilter.css'
import LocationItem from './LocationItem/LocationItem'

import { states } from '../../../data/content/home-page'
import useDropDownDisplay from '../../../hooks/useDropDownDisplay'

function LocationFilter() {

  const [selectAll, setSelectAll] = React.useState(true)
  const [searchInput, setSearchInput] = React.useState('')
  const [selectedStates, setSelectedStates] = React.useState(states.map(state => ({
    [state]: true,
    name: state,
    display: true
  })))


  const { transition, remove, setDisplayed, downArrow } = useDropDownDisplay(300)
  
  return (
    <div className='filter-pop-up-body-location'>
    <h3 
    className='filter-title'
    onClick={() => {
      setDisplayed(prev => ({
        ...prev,
        transition: !prev.transition
        }))
    }}
    >
      Filter By Location
      <img 
        src={downArrow} 
        alt='down-arrow-icon'
        className='down-arrow-filter-icon'
        style={{
          transform: transition ? 'rotate(180deg)' : 'rotate(0deg)'
        }} 
      />
    </h3>
      <div
      id={"category-box"}
      className={transition ? 'category-box-displayed' : 'category-box-hidden'}
      style={{
        display: !remove ? 'block' : 'none'
      }}
      >
        <div className='select-container'>
        <input
          type='text'
          className='filter-input-category'
          placeholder='Search States'
          value={searchInput}
          onChange={({target: {value}}) => {
            setSearchInput(value)
            setSelectedStates(prev => {
              return prev.map(state => {
                if (!value) return {...state, display: true} 
                if(state.name.toLowerCase().includes(value.toLowerCase())) {
                  return {
                    ...state,
                    display: true
                  }
                } else {
                  return {
                    ...state,
                    display: false
                  }
                }
              })
            })
              }}
        />
       
        <button 
        className='select-btns'
        onClick={() => {
          setSelectAll(!selectAll)
          setSelectedStates(prev => {
            
           return prev.map(state => {
       
              state[state.name] = !selectAll
              return state
            })
          })
        }}
        >Select All<br/> / None
        </button>
      </div>

      <ul className='location-filter-ul'>
        {selectedStates && selectedStates.map(state => (
          <LocationItem
            key={state.name + '-li'}
            state={state.name}
            checked={state[state.name]}
            setChecked={setSelectedStates}
            displayItem={state.display}
          />
        ))}
      </ul>
     </div> 

    </div>
  )
}

export default LocationFilter