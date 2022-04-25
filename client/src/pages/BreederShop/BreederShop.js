import React from 'react'
import './BreederShop.css'

import BreakLine from '../../components/BreakLine/BreakLine'
import OutlineButton from '../../components/Buttons/OutlineButton'

function BreederShop() {
  
  React.useEffect(() => {
    document.title = 'Pexotic | Breeder Shop'
    window.scrollTo(0, 0)
  })

  return (
    <main id="breederShop">
      <div className='cover-img-holder'>
        <img src="/static/cover-placeholder.jpg" alt="cover placeholder" className="cover-img" />
      </div>

      <div className='shop-info-bar'>
        <div className='shop-info'>

          <div className='shop-info-left'>
            <div className='shop-info-logo-container'>
               <img src="/static/shop-placeholder.png" alt="shop logo" className="shop-info-logo" />
            </div>
          </div>

          <div className='shop-info-right'>
            <h2>The Shop Name</h2>
            <h4>city, State</h4>
            <h4>100 Sales</h4>
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

      <div className='shop-categories-container'>

      </div>

    </main>
  )
}

export default BreederShop