import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import { fetchSearchedListings } from '../redux/reducers/searchPageListings'

function useFilteredSearch(optionalSearch = null, optionalCategory = null) {

  const dispatch = useDispatch()
  const userFilters = useSelector(state => state.userFilters.filters)

  let categoryUsed = optionalCategory ? [...userFilters.currentTags.category, optionalCategory] : userFilters.currentTags.category

  const filterObject = {
    search: optionalSearch || userFilters.search,
    price: userFilters.price,
    category: categoryUsed,
    location: userFilters.location, 
  }


   return [dispatch, fetchSearchedListings, filterObject]
}

export default useFilteredSearch