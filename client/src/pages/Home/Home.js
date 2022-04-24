import React, {useEffect} from 'react'
import './Home.css'

import CardNavBarTop from '../../components/CardNavBarTop/CardNavBarTop'
import CardNavBarBottom from '../../components/CardNavBarBottom/CardNavBarBottom'
import BreakLine from '../../components/BreakLine/BreakLine'
import PopularListings from '../../components/PopularListings/PopularListings'
import InfoCards from '../../components/InfoCards/InfoCards'

import data from '../../data/content/home-page'

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/reducers/categoryReducer';
import { getPopularListings } from '../../redux/reducers/popularListing'
import { fetchShops } from '../../redux/reducers/viewShops'

function Home() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPopularListings())
    dispatch(fetchCategories())
    dispatch(fetchShops())
    window.scrollTo(0, 0)
  }, [])
  
  const categories = useSelector(state => state.categories.filter((c, index) => index < 5))
  const shops = useSelector(state => state.viewShops.filter((c, index) => index < 5))

  

  const {navTitles, navMoreText} = data


  return (
    <main className='home-page'>
    <CardNavBarTop 
    header={navTitles[0]} 
    learnMore={navMoreText[0]}
    cards={categories} 
    />
    <BreakLine />
    <CardNavBarBottom 
    header={navTitles[1]}
    learnMore={navMoreText[1]}
    cards={shops} 
    />
    <BreakLine />
    <CardNavBarTop 
    header={navTitles[2]}
    learnMore={navMoreText[2]}
    cards={categories} 
    />
    <BreakLine />
    <PopularListings />
    <BreakLine />
    <InfoCards />
    <BreakLine />
    
    </main>
  )
}

export default Home