/** @format */
import { Container, Row, Col } from 'react-bootstrap'

import { RegistrationBody, Header } from '../../components'

const Registration = () => (
  <Container>
    <Row>
      <Col>
        <Header />
      </Col>
    </Row>
    <Row>
      <Col>
        <RegistrationBody />
      </Col>
    </Row>
  </Container>
)

export default Registration
