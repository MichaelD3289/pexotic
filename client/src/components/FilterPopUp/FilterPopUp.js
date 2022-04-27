import React from 'react'
import './FilterPopUp.css'
import closeIcon from '../../assets/icons/close-icon.svg'
import OutlineButton from '../Buttons/OutlineButton'

import { useDispatch } from 'react-redux'
import { toggleFilterPopUp } from '../../redux/reducers/filterPopUp'

import AddedFilters from './AddedFilters/AddedFilters'
import CategoryFilter from './CategoryFilter/CategoryFilter'
import LocationFilter from './LocationFilter/LocationFilter'
import PriceFilter from './PriceFilter/PriceFilter'

function FilterPopUp() {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = React.useState(false)


  return (
    <section 
      id='filter-pop-up-container'
    >
      <div 
        id='filter-pop-up-background'
        onClick={() => dispatch(toggleFilterPopUp())}
      ></div>

      <div 
        className='filter-pop-up'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

      {isHovered &&
        <img
          src={closeIcon}
          alt="x icon to close search filter pop-up"
          className='close-icon'
          style={{
            top: '20px',
            right: '25px',
            width: '25px',
          }}
          onClick={() => dispatch(toggleFilterPopUp())}
        />}

        <div className='filter-pop-up-header'>
          <h2 className='filter-pop-up-title'>
            Filters
          </h2>
        </div>
        
      
        
        <div className='filter-pop-up-body'>

        <AddedFilters />
        <CategoryFilter />
        <LocationFilter />
        <PriceFilter />

        </div>
        <OutlineButton
          style={{
            margin: '0 auto 50px auto',
            width: '80%',
            height: '40px',
          }}
        >Submit</OutlineButton>  
      </div>
      
    </section>
  )
}

export default FilterPopUp