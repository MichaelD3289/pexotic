import React, { useState } from 'react'
import './UserProfile.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import accountIcon from '../../assets/icons/account-icon.svg'
import CameraIcon from '../../components/CameraIcon/CameraIcon'
import OutlineButton from '../../components/Buttons/OutlineButton'
import BreakLine from '../../components/BreakLine/BreakLine'
import ProfileFavoriteListings from '../../components/ProfileFavoriteListings/ProfileFavoriteListings'
import BecomeSeller from '../../components/BecomeSeller/BecomeSeller'
import shopIcon from '../../assets/icons/shop-icon.svg'
import useVerifyUser from '../../hooks/useVerifyUser'

import {useSelector} from 'react-redux'

import useUploadImage from '../../hooks/useUploadImage'

function UserProfile() {
const [clickedBecomeSeller, setClickedBecomeSeller] = useState(false)

const {imageFile, submit, fileSelected, getProfileImg, dispatch} = useUploadImage('profile')


  const favoriteListings = useSelector(state => state.allFavorites)
  const {userInfo: {username, isVendor, profilePic}} = useSelector(state => state.currentUser)

  React.useEffect(() => {
    dispatch(getProfileImg())
  },[])

  return (
    <main id="user-profile-page">
      <div className='user-profile-page-top'>
        <div className='user-avatar-section'>
          <div className='user-avatar-image'>
            <img 
              src={imageFile.preview || profilePic} 
              alt='account icon' 
              id={imageFile.isSubmitted ? 'user-profile-img' : 'user-profile-img-uploading'} 
              />
              {!imageFile.isSubmitted && <button 
              className='submit-photo-btn'
              onClick={(e) => {
               submit(e).then(result => {
                dispatch(getProfileImg(result))
               })

              }}
              >
                Submit
              </button>}
            <CameraIcon setImage={fileSelected} />
          </div>
          <div className='user-avatar-name'>
            <h2 className='username-title'>
              {username}
            </h2>
            <h4 
              className='user-number-favorites'
            > 
             {favoriteListings.length} Favorites
            </h4>
            <h4 className='user-number-reviews'>0 Reviews</h4>
          </div>
        </div>
        {!isVendor ? <div className='become-seller-btn-container'>
          <OutlineButton
            style={{
              height: '80px',
              fontSize: '1.1rem',
              lineHeight: '1.75rem',
            }}
            onClick={() => setClickedBecomeSeller(!clickedBecomeSeller)}
            id={!clickedBecomeSeller ? 'become-seller-btn' : 'become-seller-btn-hidden'}
          >
            Become a <br/> Seller Today!
          </OutlineButton>
          <BecomeSeller 
            show={clickedBecomeSeller} 
            close={setClickedBecomeSeller} 
          />
        </div> :       
        <Link to='/breeder/dashboard/main' className='user-profile-seller-link'>
          <div className='user-profile-seller-dashboard'>
          <h3>Go to</h3>
          <img 
            src={shopIcon}
            alt='shop icon'
            className='user-profile-seller-dashboard-icon'
          />
          <h3>Seller Dashboard</h3>
        </div></Link>
        
        }
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