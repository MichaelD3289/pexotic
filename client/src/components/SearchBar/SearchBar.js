import React from 'react'
import './SearchBar.css'

import searchIcon from '../../assets/search-icon.svg'

function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState('')

  return (
    <div className='searchbar-container'>
      <input
         className='searchbar-input' 
         type='text' 
         placeholder='Search for Anything...'
         value={searchTerm}
         onChange={e => setSearchTerm(e.target.value)} 
         />
      <button className='search-icon-btn'>
        <img className='search-icon' src={searchIcon} alt='search icon'/>
      </button>
    </div>
  )
}

export default SearchBar