import React from 'react'
import './LocationFilter.css'
import LocationItem from './LocationItem/LocationItem'

import { useDispatch, useSelector } from 'react-redux'
import { states } from '../../../data/content/home-page'
import useDropDownDisplay from '../../../hooks/useDropDownDisplay'
import { 
  filterLocationObjects, addLocationObjects, toggleAllLocationChecked 
} from '../../../redux/reducers/userFilters'

function LocationFilter() {
  const dispatch = useDispatch()
  
  const [selectAll, setSelectAll] = React.useState(true)
  const [searchInput, setSearchInput] = React.useState('')

    const selectedStates = useSelector(state => state.userFilters.filters.location)

  React.useEffect(() => {
    if(selectedStates.length > 0) return
    dispatch(addLocationObjects(states))
  }, [])

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
            dispatch(filterLocationObjects(value))
              }}
        />
       
        <button 
        className='select-btns'
        onClick={() => {
          setSelectAll(!selectAll)
          dispatch(toggleAllLocationChecked(selectAll))
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
            displayItem={state.display}
          />
        ))}
      </ul>
     </div> 

    </div>
  )
}

export default LocationFilter