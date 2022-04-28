import React from 'react'
import './ProfileDropDown.css'
import { Link } from 'react-router-dom'

function ProfileDropDown({show}) {
  return (
    <div 
    id='profile-dropdown'
    className={show ? 'show' : 'hide'}
    >
      <div className='profile-dropdown-border'></div>
      <div className='arrow'></div>
      <Link className='dropdown-profile' to='/user/profile'>Profile</Link>
      <Link className='dropdown-messages' to='/user/messages'>Messages</Link>
    </div>
  )
}

export default ProfileDropDown