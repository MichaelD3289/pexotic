import React from 'react'
import './ProfileBar.css'

import logOutIcon from '../../assets/icons/log-out.svg'
import accountIcon from '../../assets/icons/account-icon.svg'
import downArrow from '../../assets/icons/down-arrow-icon.svg'

import { useDispatch } from 'react-redux'
import { unVerifyUser } from '../../redux/reducers/currentUser'

function ProfileBar() {
const dispatch = useDispatch()

  return (
    <div className='outline'>
      <div className='profile-bar'>
        <div className='profile-bar-left'>
          
            <button className='account-btn'>
             <div className='hover-transparent'></div>
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
            </button>
          
        </div>

        <div className='profile-bar-right'>
          
            <button 
            className='log-out-btn'
            onClick={() => {
              dispatch(unVerifyUser())
              localStorage.removeItem("access_token")
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