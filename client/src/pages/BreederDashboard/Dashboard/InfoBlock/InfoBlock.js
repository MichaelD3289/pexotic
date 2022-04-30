import React from 'react'
import './InfoBlock.css'

function InfoBlock({title, value}) {
  return (
    <div className='dashboard-info-block'>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  )
}

export default InfoBlock