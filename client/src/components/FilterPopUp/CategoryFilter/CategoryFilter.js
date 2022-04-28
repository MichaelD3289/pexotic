import React from 'react'
import './CategoryFilter.css'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { addFilterCategory } from '../../../redux/reducers/userFilters'
import useDropDownDisplay from '../../../hooks/useDropDownDisplay'



function CategoryFilter() {
  const dispatch = useDispatch()
  const { transition, remove, setDisplayed, downArrow } = useDropDownDisplay(300)
  
  const categoriesDB = useSelector(state => state.categories.map(category => category.category_name))

  const [categories, setCategories] = React.useState([])
  const [filteredCategories, setFilteredCategories] = React.useState([])
  const [searchCategory, setSearchCategory] = React.useState('')

  React.useEffect(() => {
    
    if(categoriesDB.length > 0) {
      
      setCategories(categoriesDB)
      setFilteredCategories(categoriesDB)
    }  else {
      
      axios.get('/api/categories')
      .then(res => {
        setCategories(res.data.map(category => category.category_name))
        setFilteredCategories(res.data.map(category => category.category_name))
      })
    }
   
  }, [])
  
  return (
    <div className='filter-pop-up-body-category'>
        <h3 
          className='filter-title'
          onClick={() => {
            setDisplayed(prev => ({
              ...prev,
              transition: !prev.transition
              }))
          }}
        >
          Filter By Category
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
            ><input
              type='text'
              className='filter-input-category'
              placeholder='Search Categories'
              value={searchCategory}
              onChange={(e) => {
                setSearchCategory(e.target.value)
                setFilteredCategories(categories.filter(category => category.toLowerCase().includes(e.target.value.toLowerCase())))
              }}
            />
            <div className='filter-pop-up-body-category-list'>
              <ul className='filter-pop-up-body-category-list-ul'>
                {filteredCategories.map(category => (
                  <li
                    key={category}
                    className='filter-pop-up-body-category-list-item'
                    onClick={() => dispatch(addFilterCategory(category))}
                  >{category}</li>
                ))}              
              </ul>
            </div></div>
          </div>
  )
}

export default CategoryFilter