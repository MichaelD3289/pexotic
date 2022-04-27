import React from 'react'
import './SearchPage.css'
import PopularSearchTerms from '../../components/PopularSearchTerms/PopularSearchTerms'
import filterIcon from '../../assets/icons/filter-icon.svg'
import filterIconWhite from '../../assets/icons/filter-icon-white.svg'

import FilterPopUp from '../../components/FilterPopUp/FilterPopUp'

import { useDispatch, useSelector } from 'react-redux'
import { toggleFilterPopUp } from '../../redux/reducers/filterPopUp'

function SearchPage() {
  const dispatch = useDispatch();
  const filterPopUp = useSelector(state => state.filterPopUp);
  const [filterButtonHovered, setFilterButtonHovered] = React.useState(false)

  return (
    <main>
      {filterPopUp && <FilterPopUp />}
      <PopularSearchTerms />
      <div className='listing-filter-container'>
        <button 
          className='filter-btn'
          onMouseEnter={() => setFilterButtonHovered(true)}
          onMouseLeave={() => setFilterButtonHovered(false)}
          onClick={() => dispatch(toggleFilterPopUp())}
        >
          <img
            className='filter-icon' 
            src={!filterButtonHovered ? filterIcon : filterIconWhite}
            alt='filter-icon' 
          />
          Filters
        </button>
      </div>

    </main>
  )
}

export default SearchPage