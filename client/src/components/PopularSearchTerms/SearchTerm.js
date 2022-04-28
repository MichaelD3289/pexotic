import React from 'react'

import useFilteredSearch from '../../hooks/useFilteredSearch'
import { setSearchBarTerm } from '../../redux/reducers/userFilters'

function SearchTerm({term}) {
  const [dispatch, filterSearch, body] = useFilteredSearch(term);
  return (
    <h3 
          className='search-term'
          onClick={() => {
            dispatch(setSearchBarTerm(term))
            dispatch(filterSearch(body))
          }}
        >
          {term}
        </h3>
  )
}

export default SearchTerm