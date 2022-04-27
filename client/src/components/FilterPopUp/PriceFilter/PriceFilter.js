import React from 'react'
import './PriceFilter.css'

import { addFilterPrice } from '../../../redux/reducers/userFilters'
import useDropDownDisplay from '../../../hooks/useDropDownDisplay'

import { useDispatch } from 'react-redux'

function PriceFilter() {
  const dispatch = useDispatch()
  const [currentPrice, setCurrentPrice] = React.useState('')
  const {transition, remove, setDisplayed, downArrow} = useDropDownDisplay(300)

  React.useEffect(() => {
    dispatch(addFilterPrice(currentPrice))
  }, [currentPrice])

  return (
    <div className='filter-pop-up-body-price'>
            <h3 
              className='filter-title'
              onClick={() => {
                setDisplayed(prev => ({
                  ...prev,
                  transition: !prev.transition
                  }))
              }}
            >
              Filter By Price
              <img 
                  src={downArrow} 
                  alt='down-arrow-icon'
                  className='down-arrow-filter-icon'
                  style={{
                    transform: transition ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                /> 
            </h3>

            <div
              id={"category-box"}
              className={transition ? 'category-box-displayed' : 'category-box-hidden'}
              style={{
                display: !remove ? 'block' : 'none'
              }}
            >
              <div className='price-radio-input-container'>
              <input
              type='radio'
              id='anyPrice'
              name='price'
              value='Any Price'
              onChange={(e) => setCurrentPrice(e.target.value)}
                defaultChecked
              />
              <label htmlFor='anyPrice'>Any Price</label>
              </div>
            
              <div className='price-radio-input-container'>
                <input 
                type='radio'
                id="underTwentyFive"
                name='price' 
                value='< $25'
                onChange={(e) => setCurrentPrice(e.target.value)} 
                />
                <label htmlFor="underTwentyFive">Under $25</label>
              </div>
              <div className='price-radio-input-container'>
                <input 
                type='radio'
                id='TwentyFiveToOneHundred' 
                name='price' 
                value='$25 - $100'
                onChange={(e) => setCurrentPrice(e.target.value)} 
                />
                <label htmlFor="TwentyFiveToOneHundred">$25 to $100</label>
              </div>

              <div className='price-radio-input-container'>
              <input 
              type='radio' 
              id="OneHundredToTwoHundred"
              name='price' 
              value='$100 - $200'
              onChange={(e) => setCurrentPrice(e.target.value)} 
              />
              <label htmlFor="OneHundredToTwoHundred">$100 to $200</label>
              </div>

              <div className='price-radio-input-container'>
              <input
              type='radio'
              id="overTwoHundred"
              name='price'
              value='> $200'
              onChange={(e) => setCurrentPrice(e.target.value)}
              />
              <label htmlFor="overTwoHundred">Over $200</label>
              </div>
            </div> 
          </div>
  )
}

export default PriceFilter