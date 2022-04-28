import React from 'react'
import './CameraIcon.css'
import cameraIcon from '../../assets/icons/camera-icon.svg'

function CameraIcon({show, onClick, style, ...props}) {
  show = true
  return (
    <div 
      id='camera-icon'
      className={!show ? 'hide' : 'show'}
      style={style}
    >
      <img
        className='camera-icon-image'
        src={cameraIcon}
        alt='camera icon'
      />
    </div>
  )
}

export default CameraIcon