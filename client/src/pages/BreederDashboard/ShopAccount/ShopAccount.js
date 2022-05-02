import React from 'react'
import './ShopAccount.css'

import BreakLine from '../../../components/BreakLine/BreakLine'
import OutlineButton from '../../../components/Buttons/OutlineButton'
import { useDispatch, useSelector } from 'react-redux'
import { getShopAccount } from '../../../redux/reducers/shopDashboardAccount'

import ShopCategoriesBar from '../../../components/ShopCategoriesBar/ShopCategoriesBar'
import ShopListings from '../../../components/ShopListings/ShopListings'
import CameraIcon from '../../../components/CameraIcon/CameraIcon'
import useUploadImage from '../../../hooks/useUploadImage'

function ShopAccount() {

  const dispatch = useDispatch()
  const {shop, shopCategories, shopsListings, searchCategory} = useSelector(state => state.shopDashBoardAccount)

  const {imageFile: coverImageFile, submit: submitCover, fileSelected: coverFileSelected} = useUploadImage('shop-cover')
  const {imageFile: logoImageFile, submit: submitLogo, fileSelected: shopLogoFileSelected} = useUploadImage('shop-logo')


  React.useEffect(() => {
 
    dispatch(getShopAccount())
  
    window.scrollTo(0, 0)
  },[dispatch])
  
  return (
    <main id="shopAccount">
      <div className='shopAccount-cover-img-holder'>
        <img src={coverImageFile.preview || shop.cover_img_url} alt="cover placeholder" className="shopAccount-cover-img" />
        <CameraIcon
        style={{
          left: '50%',
          bottom: '-20px',
        }}
        setImage={coverFileSelected}
        />
        {!coverImageFile.isSubmitted && <button 
          className='submit-photo-btn'
          onClick={(e) => {
            submitCover(e).then(result => {
              dispatch(getShopAccount())
            })

          }}
          >
            Submit
          </button>}
      </div>

      <div className='shopAccount-shop-info-bar'>
        <div className='shopAccount-shop-info'>

          <div className='shopAccount-shop-info-left'>
            <div className='shopAccount-shop-info-logo-container'>
               <img src={logoImageFile.preview || shop.img_url} alt="shop logo" className="shopAccount-shop-info-logo" />
               <CameraIcon
                  style={{
                    left: '50%',
                    bottom: '-30px',
                  }}
                  setImage={shopLogoFileSelected}
               />
                {!logoImageFile.isSubmitted && <button 
                className='submit-photo-btn'
                onClick={(e) => {
                  submitLogo(e).then(result => {
                    dispatch(getShopAccount())
                  })
  
                }}
                >
                  Submit
                </button>}
            </div>
          </div>

          <div className='shopAccount-shop-info-right'>
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
            <h4 className='shopAccount-trusted-seller'>Trusted Seller</h4>
          </div>
        </div>

        <div className='shopAccount-shop-info-guarantees'>
            <div className='shopAccount-shop-info-live-arrival'>
              <h2>Live Arrival</h2>
              <h2>Guarantee</h2>
            </div>
            <div className='shopAccount-shop-info-overnight-shipping'>
            <h2>Overnight</h2>
              <h2>Shipping</h2>
            </div>
        </div>

        <div className='shopAccount-shop-info-btns-holder'>
          <OutlineButton >
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

    </main>
  )
}

export default ShopAccount