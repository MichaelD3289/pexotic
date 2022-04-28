import React from 'react'
import './BecomeSeller.css'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import OutlineButton from '../Buttons/OutlineButton'
import closeIcon from '../../assets/icons/close-icon.svg'
import axios from 'axios'

import { saveCurrentUser } from '../../redux/reducers/currentUser'
import { useDispatch } from 'react-redux'


function BecomeSeller({show, close}) {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <Formik
      initialValues={{companyName: ''}}
      validationSchema={
        Yup.object({
          companyName: Yup.string().required('Required Field').max(50, 'Must be 50 characters or less'),
        })
      }
      onSubmit={(values, { setSubmitting }) => {
        
        axios.post('/api/user/becomeSeller', values)
        .then(({data}) => {
          dispatch(saveCurrentUser(data.token, data.user))
          localStorage.setItem("access_token", data.token);
          
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setSubmitting(false)
        })
      }}
    >
      <Form 
        id='become-seller-form'
        className={show ? 'show' : 'hide'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && <img 
          src={closeIcon} 
          onClick={() => close(false)} 
          alt='close icon'
          className='close-icon'
        />}
        <div className='become-seller-input-content'>
          <label
            htmlFor='companyName'
            className='become-seller-label'
          >Company Name</label>
          <Field
            className='become-seller-input-field'
            type='text'
            name='companyName'
            id='companyName'
            placeholder='Company Name'
          />
          <ErrorMessage
            name='companyName'
            component='h4'
            className='errorMsg'
          />
        </div>
        <OutlineButton
        type="submit"
          style={{
            margin: 'auto'
          }}
        >Submit</OutlineButton>
      </Form>
    </Formik>
  )
}

export default BecomeSeller