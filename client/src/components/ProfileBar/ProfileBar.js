import React from 'react'
import './ProfileBar.css'
import { Link } from 'react-router-dom'

import logOutIcon from '../../assets/icons/log-out.svg'
import accountIcon from '../../assets/icons/account-icon.svg'
import downArrow from '../../assets/icons/down-arrow-icon.svg'
import ProfileDropDown from './ProfileDropDown/ProfileDropDown'
import shopIcon from '../../assets/icons/shop-icon.svg'

import { useDispatch, useSelector } from 'react-redux'
import { unVerifyUser } from '../../redux/reducers/currentUser'

function ProfileBar() {
const dispatch = useDispatch()
const [dropdown, setDropdown] = React.useState(false)

const {userInfo: {isVendor}} = useSelector(state => state.currentUser)

  return (
    <div className='outline'>
      <div className='profile-bar'>
        {isVendor && <Link to='/breeder/dashboard'><div className='profile-bar-shop-icon-container'>
           <div 
              className='hover-transparent'
             ></div>
          <img
            src={shopIcon}
            alt='shop icon'
            className='profile-bar-shop-icon'
          />
        </div></Link>}
        <div className='profile-bar-left'>
          
            <button 
              className='account-btn'
              onClick={() => setDropdown(prev => !prev)}
            >
             <div 
              className={!dropdown ? 'hover-transparent' : ''}
             ></div>
               <img 
                className='account-icon' 
                src={accountIcon} 
                alt="account icon" 
                />
              <img 
                className='down-arrow' 
                src={downArrow} 
                alt="down arrow" 
                />
                <ProfileDropDown show={dropdown} />
            </button>
          
        </div>

        <div className='profile-bar-right'>
          
            <button 
            className='log-out-btn'
            onClick={() => {
              dispatch(unVerifyUser())
              localStorage.removeItem("access_token")
              window.location.reload()
            }}
            >
              <img 
                className='log-out-icon' 
                src={logOutIcon} 
                alt="log out" 
                />
              <p></p>
            </button>
            
         </div>
      </div>     
    </div>
  )
}

export default ProfileBar