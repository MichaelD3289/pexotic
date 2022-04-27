import React from 'react'
import './RegisterUser.css'
import axios from 'axios'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup' 

import { useDispatch } from 'react-redux'
import { accountCreatedSuccess, accountCreatedFailure, resetAccountCreated } from '../../redux/reducers/accountSuccess'

import OutlineButton from '../Buttons/OutlineButton'

import { states } from '../../data/content/home-page'

function RegisterUser({setIsRegister}) {
  const dispatch = useDispatch()

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    zipcode: '',
  }

  return (
<>
    <Formik
    initialValues={initialValues}
    validationSchema={
      Yup.object({
        firstName: Yup.string().required('Required Field').max(30, 'Must be 30 characters or less'),
        lastName: Yup.string().required('Required Field').max(30, 'Must be 30 characters or less'),
        email: Yup.string().email('Invalid email address').required('Required Field'), 
        username: Yup.string().required('Required Field').min(3, 'Username must be at least 3 characters').max(30, 'Must be 30 characters or less'),
        password: Yup.string().required('Required Field').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least 8 characters, 1 number, 1 special character and 1 letter'),
        confirmPassword: Yup.string().required('Required Field').oneOf([Yup.ref('password'), null], 'Passwords must match'),
        city: Yup.string().required('Required Field').max(30, 'Must be 30 characters or less'),
        state: Yup.string().oneOf(states, 'Must be one of the 50 US states.').required('Required Field'),
        zipcode: Yup.string().required('Required Field').max(10, 'Must be 10 characters or less')
       })
    }
    onSubmit={(values, { setSubmitting }) => {
      axios
      .post('/api/users/register', values)
      .then(res => {
        if(!res.data.message) {
          setIsRegister(false)
          dispatch(accountCreatedSuccess())
        } else {
          dispatch(accountCreatedFailure(res.data.message))
        }
        
        
        // setIsRegister()        
      })
      .catch(err => {
        dispatch(accountCreatedFailure(err.message))
        
      })
      .finally(() => {        
         
          setSubmitting(false)

      })
      
    }}
    >

      <Form className="register-form">
        <div className='input-content'>
          <label
          className='label'
          htmlFor="firstName"
          >First Name</label>
          <Field
          className="inputField"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          />
          <ErrorMessage 
          className='errorMsg'
          name="firstName"
          component="h4"
          />
        </div>

        <div className='input-content'>
          <label
          className='label'
          htmlFor="lastName"
          >Last Name</label>
          <Field 
          className="inputField"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          />
          <ErrorMessage 
          className='errorMsg'
          name="lastName"
          component="h4"
          />
        </div>
        <div className='input-content'>
          <label
          className='label'
          htmlFor="email"
          >Email</label>
          <Field 
          className="inputField"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          />
          <ErrorMessage 
          className='errorMsg'
          name="email"
          component="h4"
          />
        </div>
        <div className='input-content'>
          <label
          className='label'
          htmlFor="username"
          >Username</label>
          <Field 
          className="inputField"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          />
          <ErrorMessage 
          className='errorMsg'
          name="username"
          component="h4"
          />
        </div>
        <div className='input-content'>
          <label
          className='label'
          htmlFor="password"
          >Password</label>
          <Field 
          className="inputField"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          />
          <ErrorMessage 
          className='errorMsg'
          name="password"
          component="h4"
          />
        </div>
        <div className='input-content'>
          <label
          className='label'
          htmlFor="confirmPassword"
          >Confirm Password</label>
          <Field 
          className="inputField"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          />
          <ErrorMessage 
          className='errorMsg'
          name="confirmPassword"
          component="h4"
          />
        </div>
        <div className='input-content'>
          <label
          className='label'
          htmlFor="city"
          >City</label>
          <Field
          className="inputField"
          id="city"
          name="city"
          type="text"
          placeholder="City"
          />
          <ErrorMessage
          className='errorMsg'
          name="city"
          component="h4"
          />
        </div>
        <div className='input-content'>
          <label
          className='label'
          htmlFor="state"
          >State</label>
          <Field
          className="inputField"
          id="state"
          name="state"
          as="select"
          placeholder="State"
          > 
            <option value="" disabled>Select a State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </Field>
          <ErrorMessage
          className='errorMsg'
          name="state"
          component="h4"
          />
        </div>
        <div className='input-content'>
          <label
          className='label'
          htmlFor="zipcode"
          >Zipcode</label>
          <Field
          className="inputField"
          id="zipcode"
          name="zipcode"
          type="text"
          placeholder="Zipcode"
          />
          <ErrorMessage
          className='errorMsg'
          name="zipcode"
          component="h4"
          />
        </div>
        <OutlineButton type='submit'>Sign-Up</OutlineButton>
      </Form>

    </Formik></>
  )
}

export default RegisterUser