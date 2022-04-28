import React from 'react'
import './PopularSearchTerms.css'
import SearchTerm from './SearchTerm'

import { useSelector } from 'react-redux'


function PopularSearchTerms() {
  const popularSearchTerms = useSelector(state => state.popularSearchTerms).map(term => term.search_term)
 

  return (
    <section className='popular-search-terms'>
    <h2 className='popular-search-terms-title'>
      Popular Searches
    </h2>
    <div className='search-term-container'>
      {popularSearchTerms.map((term, i) => (
        <SearchTerm key={i + term + i} term={term} />
      ))}
      </div>

  </section>
  )
}

export default PopularSearchTerms