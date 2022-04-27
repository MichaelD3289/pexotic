import React from 'react'
import './SearchBar.css'
import { Link } from 'react-router-dom'

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
      <Link to='search'>
        <button className='search-icon-btn'>
          <img className='search-icon' src={searchIcon} alt='search icon'/>
        </button>
      </Link>
    </div>
  )
}

export default SearchBar