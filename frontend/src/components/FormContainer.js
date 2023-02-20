import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Container className='mt-3'>
      <Row className='justify-content-md-center align-items-center' style={{minHeight:'50vh'}}>
        <Col md={8} lg={5} className="border border-light rounded p-3">
            {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
