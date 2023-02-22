import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Col, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartAction';


const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;
  if(!shippingAddress) navigate('/shipping');
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  }
  return (
    <FormContainer>
    <CheckoutSteps step1 step2 step3/>
    <h2 className='text-center mb-3'>Payment Method</h2>
    <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
        </Form.Group>
        <Row>
            <Col>
                <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name = 'paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                <Form.Check type='radio' label='Stripe' id='Stripe' name = 'paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            </Col>
        </Row>
        <div className="d-grid mt-3">
            <Button  type='submit' variant='primary'>
                Continue
            </Button>
        </div>
    </Form>
    </FormContainer>
  )
}

export default PaymentScreen
