import React from 'react'
import './LogInPopUp.css'

import { useDispatch, useSelector } from 'react-redux'
import { toggleAccountPopUp } from '../../redux/reducers/accountPopUp' 

import closeIcon from '../../assets/icons/close-icon.svg'

import RegisterUser from '../Register/RegisterUser'
import SignIn from '../SignIn/SignIn'
import OutlineButton from '../Buttons/OutlineButton'
import Success from '../Messages/Success'
import Error from '../Messages/Error'

function LogInPopUp({show}) {
  const [isRegister, setIsRegister] = React.useState(false);
  const [isHovered, setisHovered] = React.useState(false)
  
  const dispatch = useDispatch()
  const accountSuccess = useSelector(state => state.accountSuccess)

  const handleisRegister = () => {
    setIsRegister(prev => !prev)
  }
  
  return (
    <div id={show ? 'fade-in' : 'fade-out'} className='popup'>
              {accountSuccess.type === "success" && 
        <div className='popup-message'>
          <Success title="Success!">
            <h3>Your Account has been Created!</h3>
            <p>Please sign-in using your username and password</p>
          </Success>
          </div>}

          {accountSuccess.type === "error" && 
        <div className='popup-message'>
          <Error title="Error">
            <h3>There was a problem on Submission</h3>
            <p>{accountSuccess.message}</p>
          </Error>
          </div>}
      <div 
      className={`popup-background`}
      onClick={() => dispatch(toggleAccountPopUp())}></div>
      <div 
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}className='popup-box'
      >
        {isHovered &&
        <img 
        src={closeIcon} 
        alt="x icon to close pop up" 
        className='close-icon'
        onClick={() => dispatch(toggleAccountPopUp())}
        />}
        <div className='popup-header'>
          
            <h1><span className='bold'>
              {isRegister ? 'Register' : 'Sign in'}
            </span></h1>
            <h1>OR</h1>
            <OutlineButton onClick={handleisRegister}>
            {!isRegister ? 'Register Now' : 'Sign in'}
            </OutlineButton>
        </div>
          {isRegister ? <RegisterUser setIsRegister={handleisRegister} /> : <SignIn />}
        </div>


      </div>
    
  )
}

export default LogInPopUp