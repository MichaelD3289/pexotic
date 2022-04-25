import React from 'react'
import { useDispatch} from 'react-redux'
import { addToRecentlyViewed } from '../redux/reducers/recentlyViewed'

function useAddToRecents(listingId) {

const dispatch = useDispatch()

const addTo = dispatch(addToRecentlyViewed(listingId))

  return addTo
}

export default useAddToRecents