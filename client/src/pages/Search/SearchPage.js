import React from 'react'
import './SearchPage.css'
import PopularSearchTerms from '../../components/PopularSearchTerms/PopularSearchTerms'
import filterIcon from '../../assets/icons/filter-icon.svg'
import filterIconWhite from '../../assets/icons/filter-icon-white.svg'

import BreakLine from '../../components/BreakLine/BreakLine'
import FilterPopUp from '../../components/FilterPopUp/FilterPopUp'
import SearchListings from '../../components/SearchListings/SearchListings'

import { useDispatch, useSelector } from 'react-redux'
import { toggleFilterPopUp } from '../../redux/reducers/filterPopUp'
import { fetchPopularSearchTerms } from '../../redux/reducers/popularSearchTerms'
import useFilteredSearch from '../../hooks/useFilteredSearch'

function SearchPage() {
  const dispatch = useDispatch();
  const filterPopUp = useSelector(state => state.filterPopUp);
  const [filterButtonHovered, setFilterButtonHovered] = React.useState(false)
  const listings = useSelector(state => state.searchPageListings)
  const [dis, filterSearch, body] = useFilteredSearch();
  

  React.useEffect(() => {
    document.title = 'Pexotic | Search'
    dispatch(fetchPopularSearchTerms())
    window.scrollTo(0, 0)
  }, [])

  React.useEffect(() => {
    if(listings.length === 0) {
      dis(filterSearch(body))
    }
  }, [])

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
      <SearchListings />
      <BreakLine />
    </main>
  )
}

export default SearchPage