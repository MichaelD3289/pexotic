import React, {useEffect} from 'react'
import './Dashboard.css'

import InfoBlock from './InfoBlock/InfoBlock'
import { useSelector, useDispatch } from 'react-redux'
import { getShopDashboardInfo } from '../../../redux/reducers/shopDashboardInfo'

function Dashboard() {
const dispatch = useDispatch()
const [option, setOption] = React.useState('today')
  useEffect(() => {
    document.title = 'Pexotic | Breeder | Dashboard'
    if(displayInfo.retreived) return
    dispatch(getShopDashboardInfo())
  }, [])
const displayInfo = useSelector(state => state.shopDashboardInfo)


  return (
    <main id='dashboard'>
      <div className='date-range-container'>
        <h3 className='date-range-container-text'>Choose Date Range</h3>
        <select 
        className='date-range-select'
        onChange={(e) => setOption(e.target.value)}
        value={option}
        >
          <option 
          className='date-range-option' 
          value='today'
          >Today
          </option>
          <option
          className='date-range-option'
          value='yesterday'
          >Yesterday</option>
          <option
          className='date-range-option'
          value='last7Days'
          >Last 7 Days</option>
          <option
          className='date-range-option'
          value='last30Days'
          >Last 30 Days</option>
          <option
          className='date-range-option'
          value='last90Days'
          >Last 90 Days</option>
          <option
          className='date-range-option'
          value='last365Days'
          >Last 365 Days</option>
        </select>
      </div>
      <div className='dashboard-info-container' >
        <InfoBlock 
          title='Listing Views' 
          value={displayInfo[option].listingViews} 
        />
        <InfoBlock 
          title='Shop Views' 
          value={displayInfo[option].shopViews} 
        />
        <InfoBlock 
          title='Orders' 
          value={displayInfo[option].orders} 
        />
        <InfoBlock 
          title='Revenue' 
          value={displayInfo[option].revenue} 
        />
      </div>
    </main>
  )
}

export default Dashboard