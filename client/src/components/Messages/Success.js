import React from 'react'
import './Success.css'
import closeIcon from '../../assets/icons/close-icon.svg'

import { useDispatch } from 'react-redux'
import { resetAccountCreated } from '../../redux/reducers/accountSuccess'

function Success({children, title, ...props}) {
  const [isHovered, setisHovered] = React.useState(false)
  const dispatch = useDispatch()
  
  return (
    <div 
    className='success-message'
    onMouseEnter={() => setisHovered(true)}
    onMouseLeave={() => setisHovered(false)}
    >
      {isHovered &&
        <img 
        src={closeIcon} 
        alt="x icon to close pop up" 
        className='close-icon'
        onClick={() => dispatch(resetAccountCreated())}
        />}
      <div className='close'></div>
      {title && <h2>{title}</h2>}
      <div className='text-container'>
        {[...children]}
      </div>
    </div>
  )
}

export default Success