import React from 'react'
import './CameraIcon.css'
import cameraIcon from '../../assets/icons/camera-icon.svg'

function CameraIcon({show, onClick, style, setImage, ...props}) {
  const [isHovered, setIsHovered] = React.useState(false)

  
  show = true
  return (
    <div 
      id='camera-icon'
      className={!show ? 'hide' : 'show'}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className='camera-icon-image'
        src={cameraIcon}
        alt='camera icon'
      />
      <label 
        className='image-input-label-show' 

      >
        
      <input
      type='file'
      accept='image/*'
      onChange={setImage}
      className='image-input'
      />
      </label>
    </div>
  )
}

export default CameraIcon