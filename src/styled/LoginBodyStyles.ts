/** @format */

import styled from 'styled-components'
import { Button, Col, Form } from 'react-bootstrap'

export const StyledFormContainer = styled.div`
  padding-top: 3rem;
`

export const StyledCol = styled(Col)`
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.colors.normal};
  border-radius: 8px;
  padding-top: 1rem;
`

export const StyledHeading = styled.h3`
  text-align: center;
`

export const StyledFormGroup = styled.div`
  margin: 1rem;
`

export const StyledFormLabel = styled(Form.Label)`
  font-weight: bold;
`

export const StyledFormControl = styled(Form.Control)`
  width: 100%;
`

export const StyledSubmitButton = styled(Button)`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.primary};
`
