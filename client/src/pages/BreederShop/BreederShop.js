import React from 'react'
import './BreederShop.css'

import BreakLine from '../../components/BreakLine/BreakLine'
import OutlineButton from '../../components/Buttons/OutlineButton'
import { useDispatch, useSelector } from 'react-redux'
import { getShop } from '../../redux/reducers/currentShop'

import ShopCategoriesBar from '../../components/ShopCategoriesBar/ShopCategoriesBar'
import ShopListings from '../../components/ShopListings/ShopListings'

function BreederShop() {

  const dispatch = useDispatch()
  const {shop, shopsListings, shopCategories, searchCategory} = useSelector(state => state.currentShop)
  
  React.useEffect(() => {
 
    dispatch(getShop(parseInt(window.location.href.split('/')[5])))
  
    window.scrollTo(0, 0)
  },[dispatch])
  
  return (
    <main id="breederShop">
      <div className='cover-img-holder'>
        <img src={`/static/${shop.cover_img_url}`} alt="cover placeholder" className="cover-img" />
      </div>

      <div className='shop-info-bar'>
        <div className='shop-info'>

          <div className='shop-info-left'>
            <div className='shop-info-logo-container'>
               <img src={`/static/${shop.img_url.replace('jpg', 'png')}`} alt="shop logo" className="shop-info-logo" />
            </div>
          </div>

          <div className='shop-info-right'>
            <h2>{shop.company_name}</h2>
            <h4>{shop.city && shop.city},&nbsp;
            {shop.state && shop.state.replace(
              shop.state.charAt(0),   
              shop.state.charAt(0).toUpperCase())}
            </h4>
            <h4>{
                shopsListings.reduce((acc, listing) => {
                  return acc + listing.number_sold
                }, 0)
              } Sales</h4>
            <h4 className='trusted-seller'>Trusted Seller</h4>
          </div>
        </div>

        <div className='shop-info-guarantees'>
            <div className='shop-info-live-arrival'>
              <h2>Live Arrival</h2>
              <h2>Guarantee</h2>
            </div>
            <div className='shop-info-overnight-shipping'>
            <h2>Overnight</h2>
              <h2>Shipping</h2>
            </div>
        </div>

        <div className='shop-info-btns-holder'>
          <OutlineButton>
            Favorite Shop
          </OutlineButton>
          <OutlineButton
            className='outline-btn green'
            style={{borderColor: "#3CA836"}}
          >
            Contact Shop
          </OutlineButton>
        </div>
      </div>

      <BreakLine/>

      <ShopCategoriesBar
      shopCategories={shopCategories}
      />
      <ShopListings 
        shopsListings={shopsListings}
        searchTerm={searchCategory} 
      />

      <BreakLine />


    </main>
  )
}

export default BreederShop