import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import { fetchSearchedListings } from '../redux/reducers/searchPageListings'

function useFilteredSearch(optionalTerm = null) {

  const dispatch = useDispatch()
  const userFilters = useSelector(state => state.userFilters.filters)

  const filterObject = {
    search: optionalTerm || userFilters.search,
    price: userFilters.price,
    category: userFilters.currentTags.category,
    location: userFilters.location, 
  }


   return [dispatch, fetchSearchedListings, filterObject]
}

export default useFilteredSearch