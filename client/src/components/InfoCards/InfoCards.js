import React from 'react'
import './InfoCards.css'

import logo from '../../assets/images/pexotic.png'
import InfoCard from './InfoCard'
import {learnMore} from '../../data/content/home-page'

function InfoCards() {
  return (
    <section id="learn-more">
      <img className='info-logo' src={logo} alt="pexotic logo" />
      <div className='info-container'>
        {learnMore.map((card, index) => (
          <InfoCard key={index} card={card} />
        ))}
      </div>
    </section>
  )
}

export default InfoCards