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

  console.log(localStorage.getItem('listingID'))

  useEffect(() => {
    dispatch(getListing(parseInt(window.location.href.split('/')[5])))
  }, [dispatch])


  return (
    <main id="listing-page">
      
      <ListingDetails />
      <BreakLine />
    </main>
  )
}

export default Listing