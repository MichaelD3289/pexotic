import React from 'react'
import './SearchBar.css'
import { Link } from 'react-router-dom'

import searchIcon from '../../assets/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchBarTerm } from '../../redux/reducers/userFilters'
import useFilteredSearch from '../../hooks/useFilteredSearch'

function SearchBar() {
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.userFilters.filters.search)
  const [dis, filterSearch, body] = useFilteredSearch();
  return (
    <div className='searchbar-container'>
      <input
         className='searchbar-input' 
         type='text' 
         placeholder='Search for Anything...'
         value={searchTerm}
         onChange={e => dispatch(setSearchBarTerm(e.target.value))} 
         />
      <Link to='search'>
        <button 
        className='search-icon-btn'
        onClick={() => {
          dis(filterSearch(body))
        }
          
        }
        >
          <img className='search-icon' src={searchIcon} alt='search icon'/>
        </button>
      </Link>
    </div>
  )
}

export default SearchBar