import React from 'react'
import './PriceBadge.css'

function PriceBadge({style, price, isHovered, ...props}) {

  isHovered = isHovered === undefined ? true : isHovered
const display = isHovered ? 'flex' : 'none'

  return (
    <div id="price-badge" {...props} style={{...style, display: display}}>
      <p><span>$</span>{price && price.toFixed(2)}</p>
    </div>
  )
}

export default PriceBadge