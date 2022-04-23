import React, {useEffect} from 'react'
import './Listing.css'

import ListingDetails from '../../components/ListingDetails/ListingDetails'
import BreakLine from '../../components/BreakLine/BreakLine'
import { useDispatch, useSelector} from 'react-redux'
import { getListing } from '../../redux/reducers/currentListing'

import FavoriteHeart from '../../components/FavoriteHeart/FavoriteHeart'


function Listing() {
  const dispatch = useDispatch()

  const listing = useSelector(state => state.currentListing)
  useEffect(() => {
    console.log('ran')
    dispatch(getListing(41))
  }, [])


  return (
    <main id="listing-page">
      
      <ListingDetails />
      <BreakLine />
    </main>
  )
}

export default Listing