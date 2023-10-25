/** @format */
import { useState, FC } from 'react'
import { Row, Button } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyledCol,
  StyledHeading,
  StyledFormContainer,
  StyledFormGroup,
  StyledFormLabel,
  StyledFormControl
} from '../styled/RegistrationBodyStyles'
import { IFormValues } from '../components/interfaces'
import NotificationModal from './NotificationModal'
import { RootState } from '../redux/rootReducer'
import { setError } from '../redux/ducks/auth'

const RegistrationBody: FC = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useDispatch()
  const error = useSelector((state: RootState) => state.auth.error)
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('This field is required'),
    firstName: Yup.string().required('This field is required'),
    lastName: Yup.string().required('This field is required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters long')
      .required('This field is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('This field is required')
  })

  const handleSubmit = async (
    values: IFormValues,
    { resetForm }: FormikHelpers<IFormValues>
  ) => {
    try {
      const response = await dispatch({
        type: 'REGISTRATION',
        email: values.email,
        password: values.password
      })
      if (response) {
        console.log(response)
        setIsSuccess(true)
        resetForm()
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleCloseModal = () => {
    dispatch(setError(null))
    setIsSuccess(false)
    setTimeout(() => {
      navigate('/login')
    }, 500)
  }
  const handleCloseModalError = () => {
    dispatch(setError(null))
    setIsSuccess(false)
  }

  return (
    <Row>
      <StyledFormContainer>
        <StyledCol xs={12} md={6}>
          <StyledHeading>Registration Form</StyledHeading>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
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
                  <StyledFormLabel>First name</StyledFormLabel>
                  <Field
                    name='firstName'
                    as={StyledFormControl}
                    placeholder='First name'
                  />
                  <ErrorMessage name='firstName' component='div' />
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledFormLabel>Last name</StyledFormLabel>
                  <Field
                    name='lastName'
                    as={StyledFormControl}
                    placeholder='Last name'
                  />
                  <ErrorMessage name='lastName' component='div' />
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
                <StyledFormGroup>
                  <StyledFormLabel>Confirm Password:</StyledFormLabel>
                  <Field
                    name='confirmPassword'
                    as={StyledFormControl}
                    type='password'
                    placeholder='Confirm Password'
                  />
                  <ErrorMessage name='confirmPassword' component='div' />
                </StyledFormGroup>
                <Button type='submit' disabled={!isValid}>
                  Registration
                </Button>
              </Form>
            )}
          </Formik>
          {error && (
            <NotificationModal
              show={true}
              message={error}
              type='error'
              onClose={handleCloseModalError}
            />
          )}
          {isSuccess && (
            <NotificationModal
              show={true}
              message='Your registration was successful.'
              type='success'
              onClose={handleCloseModal}
            />
          )}
        </StyledCol>
      </StyledFormContainer>
    </Row>
  )
}

export default RegistrationBody
