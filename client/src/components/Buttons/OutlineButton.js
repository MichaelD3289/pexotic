import React from 'react'
import './OutlineButton.css'

function OutlineButton({children, ...props}) {
  
  return (
    <button type="button" className='outline-btn' {...props}>
        <div className='outline-hover-effect'>
          {children}
        </div>
      </button>
  )
}

export default OutlineButton