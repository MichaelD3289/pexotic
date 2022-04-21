import React from 'react'
import './SignIn.css'
import axios from 'axios'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup' 

import OutlineButton from '../Buttons/OutlineButton'

import { useDispatch } from 'react-redux'
import { saveCurrentUser } from '../../redux/reducers/currentUser'
import {accountCreatedFailure} from '../../redux/reducers/accountSuccess'

function SignIn() {

  const dispatch = useDispatch()

  return (

  <Formik
  initialValues={{username: '', password: ''}}
  validationSchema={
    Yup.object({
      username: Yup.string().required('Required Field'),
      password: Yup.string().required('Required Field')
    })
  }
  onSubmit={(values, { setSubmitting }) => {
    console.log(values)
      axios
      .post('/api/users/login', values)
      .then(res => {
        
        dispatch(saveCurrentUser(res.data.token))
        localStorage.setItem("access_token", res.data.token);
        })
      .catch(err => {
        console.log(err)
        dispatch(accountCreatedFailure('Invalid'))
      
        })
      .finally(() => {
        setSubmitting(false)
        })
    }
  }
  >

    <Form className="log-in-form">

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

      <OutlineButton type="submit">Sign In</OutlineButton>
    </Form>
  </Formik>
  )
}

export default SignIn