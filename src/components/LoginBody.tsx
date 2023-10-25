/** @format */
import { FC, useEffect, useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  StyledFormContainer,
  StyledCol,
  StyledHeading,
  StyledFormGroup,
  StyledFormLabel,
  StyledFormControl,
} from '../styled/LoginBodyStyles'
import { RootState } from '../redux/rootReducer'
import NotificationModal from './NotificationModal'
import { setError } from '../redux/ducks/auth'

interface FormValues {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
})

const LoginBody: FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state: RootState) => state.auth.error)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const handleSubmitForm = async (values: FormValues) => {
    await dispatch({
      type: 'LOGIN',
      email: values.email,
      password: values.password
    })
  }
  const handleCloseModalError = () => {
    dispatch(setError(null))
  }
  useEffect(() => {
    if(isAuth){
      setTimeout(() => {
      navigate('/')
    }, 500)}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])

  return (
    <Row>
      <StyledFormContainer>
        <StyledCol data-testid='login col' xs={12} md={6}>
          <StyledHeading>Login</StyledHeading>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}>
            <Form>
              <StyledFormGroup>
                <StyledFormLabel>Email address</StyledFormLabel>
                <Field
                  name='email'
                  as={StyledFormControl}
                  type='email'
                  placeholder='Email address'
                />
                <ErrorMessage name='email' component='div' />
              </StyledFormGroup>
              <StyledFormGroup>
                <StyledFormLabel>Password</StyledFormLabel>
                <Field
                  name='password'
                  as={StyledFormControl}
                  type='password'
                  placeholder='Password'
                />
                <ErrorMessage name='password' component='div' />
              </StyledFormGroup>
              <Button
                data-testid='submit-button'
                className='mb-3'
                type='submit'>
                Login
              </Button>
            </Form>
          </Formik>
        </StyledCol>
        {error && <NotificationModal show={true} message={error} type="error" onClose={handleCloseModalError} />}
      </StyledFormContainer>
    </Row>
  )
}

export default LoginBody
