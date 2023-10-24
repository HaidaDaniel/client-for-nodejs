/** @format */
import styled from 'styled-components'
import { Form } from 'react-bootstrap'

export const StyledFormGroup = styled(Form.Group)`
  border: 1px solid ${(props) => props.theme.colors.bordercolor};
  border-radius: 8px;
`
export const StyledFormLabel = styled(Form.Label)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0;
`
export const StyledTextArea = styled.div`
  padding: 1rem;
  padding-top: 0;
`
