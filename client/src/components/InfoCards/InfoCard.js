import React from 'react'
import './InfoCard.css'

import OutlineButton from '../Buttons/OutlineButton'

function InfoCard({card : {title, content, buttonText, buttonLink}}) {

  return (
    <div className="info-card">
          <h3 className='info-card-title'>{title}</h3>
          {content.split('\n').map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
          <OutlineButton>
            {buttonText}
          </OutlineButton>
        </div>
  )
}

export default InfoCard