import React from 'react'
import './NavBarCard.css'
import shopImg from '../../../assets/placeholders/shop-placeholder.png'

function NavBarCard({cardInfo}) {
  let {seller_id, img_url, company_name} = cardInfo

    // max length of title before "..." is added
    const maxTitleLength = 16

    // adding "..." to the end of the card name if it is too long
    company_name.length > maxTitleLength && (company_name = company_name.slice(0, maxTitleLength) + '...')

  return (
    <li className='nav-item-b'>
    <a className='nav-link-b' href='#'>
      <h4 className='nav-item-title-b'>
        {company_name}
      </h4>
      
      <div className='white-bg'>
        <img className='nav-item-img-b' src={`/static/${img_url.replace('jpg', 'png')}`} alt="" />
      </div>
      
    </a>
    
  </li>
  )
}

export default NavBarCard