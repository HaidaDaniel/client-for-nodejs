/** @format */
import { FC } from 'react'
import { Row, Button } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  StyledFormContainer,
  StyledCol,
  StyledHeading,
  StyledFormGroup,
  StyledFormLabel,
  StyledFormControl,
} from '../styled/LoginBodyStyles'

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

  const handleSubmitForm = (values: FormValues) => {
    dispatch({
      type: 'LOGIN',
      email: values.email,
      password: values.password
    })
    setTimeout(() => {
      navigate(-1)
    }, 500)
  }

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
      </StyledFormContainer>
    </Row>
  )
}

export default LoginBody
