import React from 'react'
import './TopFooter.css'
import facebookIcon from '../../assets/icons/facebook-icon.png'
import instagramIcon from '../../assets/icons/instagram-icon.png'
import pinterestIcon from '../../assets/icons/pinterest-icon.png'
import twitterIcon from '../../assets/icons/twitter-icon.png'
import youtubeIcon from '../../assets/icons/youtube-icon.png'

function TopFooter() {
  return (
    <section className='topFooter'>
      <div className='footer-links-container'>
        <div className='footer-shop'>
          <h3 className='footer-title shop'>Shop</h3>
          <ul className='footer-list shop'>
            <a href=""><li>Shop</li></a>
            <a href=""><li>Gift Cards</li></a>
          </ul>
        </div>
        <div className='footer-sell'>
          <h3 className='footer-title sell'>Sell</h3>
          <ul className='footer-list sell'>
            <a href=""><li>Sell</li></a>
            <a href=""><li>Affiliate Program</li></a>
            <a href=""><li>Advertise</li></a>
          </ul>
        </div>
        <div className='footer-learn'>
          <h3 className='footer-title learn'>Learn</h3>
          <ul className='footer-list learn'>
            <a href=""><li>Care Sheets</li></a>
            <a href=""><li>Blog</li></a>
            <a href=""><li>Podcast</li></a>
          </ul>
        </div>
        <div className='footer-about'>
          <h3 className='footer-title about'>About</h3>
          <ul className='footer-list about'>
            <a href=""><li>Careers</li></a>
            <a href=""><li>Help Page</li></a>
            <a href=""><li>Terms of Use</li></a>
            <a href=""><li>Privacy</li></a>
          </ul>
        </div>
      </div>
      <div className='social-media-container'>
        <h3 className='find-us'>Find us!</h3>
        <div className='social-media-icons'>
          <div className='icon-box'>
            <div className='transparent-hover'>
              <a href="http://www.instagram.com" target="_blank" rel="noreferrer"><img className='icon insta' src={instagramIcon} alt="instagram logo" /></a>
            </div>
          </div>
          <div className='icon-box'>
            <div className='transparent-hover'>
            <a href="http://www.facebook.com" target="_blank" rel="noreferrer"><img className='icon fb' src={facebookIcon} alt="facebook logo" /></a>
            </div>
          </div>
          <div className='icon-box'>
           <div className='transparent-hover'>
           <a href="http://www.pinterest.com" target="_blank" rel="noreferrer"><img className='icon fb' src={pinterestIcon} alt="Pinterest logo" /></a>
          </div>
          </div>
          <div className='icon-box'>
            <div className='transparent-hover'>
            <a href="http://www.twitter.com" target="_blank" rel="noreferrer"><img className='icon fb' src={twitterIcon} alt="Twitter logo" /></a>
            </div>
          </div>
          <div className='icon-box'>
           <div className='transparent-hover'>
           <a href="http://www.youtube.com" target="_blank" rel="noreferrer"><img className='icon fb' src={youtubeIcon} alt="YouTube logo" /></a>
           </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default TopFooter