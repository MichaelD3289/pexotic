import React from 'react'
import './NavBarCard.css'
import { Link } from 'react-router-dom'


function NavBarCard({cardInfo}) {
  let {seller_id, img_url, company_name} = cardInfo

    // max length of title before "..." is added
    const maxTitleLength = 16
    const fullName = company_name
    // adding "..." to the end of the card name if it is too long
    company_name.length > maxTitleLength && (company_name = company_name.slice(0, maxTitleLength) + '...')

  return (
    <li className='nav-item-b'>
    <Link 
      className='nav-link-b' 
      to={`/breeder/shop/${seller_id}/${fullName.replace(/\s/g, '-')}`}
    >
      <h4 className='nav-item-title-b'>
        {company_name}
      </h4>
      
      <div className='white-bg'>
        <img className='nav-item-img-b' src={`${img_url}`} alt="" />
      </div>
      
    </Link>
    
  </li>
  )
}

export default NavBarCard