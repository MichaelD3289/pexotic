import React from 'react'
import './InfoCard.css'

import { Link } from 'react-router-dom'

import OutlineButton from '../Buttons/OutlineButton'

import { useDispatch } from 'react-redux'
import { toggleAccountPopUp } from '../../redux/reducers/accountPopUp'

function InfoCard({card : {title, content, buttonText, buttonLink}}) {
  const dispatch = useDispatch()

  return (
    <div className="info-card">
          <h3 className='info-card-title'>{title}</h3>
          {content.split('\n').map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
          {buttonLink !== 'register' ? 
          <Link to={`${buttonLink}`}>
            <OutlineButton>
              {buttonText}
            </OutlineButton>
          </Link> :
          <OutlineButton
          onClick={() => dispatch(toggleAccountPopUp())}
          >
            {buttonText}
          </OutlineButton>}
        </div>
  )
}

export default InfoCard