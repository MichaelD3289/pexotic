import React from 'react'
import './UserProfile.css'
import accountIcon from '../../assets/icons/account-icon.svg'
import CameraIcon from '../../components/CameraIcon/CameraIcon'
import OutlineButton from '../../components/Buttons/OutlineButton'
import BreakLine from '../../components/BreakLine/BreakLine'
import ProfileFavoriteListings from '../../components/ProfileFavoriteListings/ProfileFavoriteListings'

import {useSelector} from 'react-redux'

function UserProfile() {
  
  const favoriteListings = useSelector(state => state.allFavorites)

  return (
    <main id="user-profile-page">
      <div className='user-profile-page-top'>
        <div className='user-avatar-section'>
          <div className='user-avatar-image'>
            <img 
              src={accountIcon} 
              alt='account icon' 
              id='user-profile-img' 
              />
            <CameraIcon />
          </div>
          <div className='user-avatar-name'>
            <h2 className='username-title'>Username</h2>
            <h4 className='user-number-favorites'>5 Favorites</h4>
            <h4 className='user-number-reviews'>0 Reviews</h4>
          </div>
        </div>
        <div className='become-seller-btn-container'>
          <OutlineButton
            style={{
              height: '80px',
              fontSize: '1.1rem',
              lineHeight: '1.75rem',
            }}
          >
            Become a <br/> Seller Today
          </OutlineButton>
        </div>
      </div>
      <BreakLine />
      {favoriteListings.length > 0 && <><ProfileFavoriteListings
        favoriteListings={favoriteListings}
      />
      <BreakLine /></>}
    </main>
  )
}

export default UserProfile