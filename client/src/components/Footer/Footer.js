import React from 'react'
import './Footer.css'

import TopFooter from './TopFooter'
import BottomFooter from './BottomFooter'

function Footer() {
  return (
    <footer className="footer">
      <TopFooter />
      <BottomFooter />
    </footer>
  )
}

export default Footer