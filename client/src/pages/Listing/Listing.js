import React, {useEffect} from 'react'
import './Listing.css'

import ListingDetails from '../../components/ListingDetails/ListingDetails'
import BreakLine from '../../components/BreakLine/BreakLine'
import { useDispatch, useSelector} from 'react-redux'
import { getListing } from '../../redux/reducers/currentListing'


function Listing() {

  const dispatch = useDispatch()

  const listing = useSelector(state => state.currentListing)

  useEffect(() => {
    dispatch(getListing(parseInt(window.location.href.split('/')[5])))
    window.scrollTo(0, 0)
  }, [dispatch])


  return (
    <main id="listing-page">
      
      <ListingDetails />
      <BreakLine />
    </main>
  )
}

export default Listing