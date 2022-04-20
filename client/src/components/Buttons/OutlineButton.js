import React from 'react'
import './OutlineButton.css'

function OutlineButton({children}) {
  return (
    <button className='outline-btn'>
        <div className='outline-hover-effect'>
          {children}
        </div>
      </button>
  )
}

export default OutlineButton