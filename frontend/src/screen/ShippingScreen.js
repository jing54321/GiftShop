import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartAction';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [province, setProvince] = useState(shippingAddress.province);
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,province}))
        navigate('/payment')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h2 className='text-center'>Shipping Address</h2>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
            <Form.Label className=''>Address</Form.Label>
            <Form.Control 
                type='address' 
                placeholder='address'
                value={address} 
                onChange={(e) => setAddress(e.target.value)}>
            </Form.Control>
        </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label className='mt-3'>City</Form.Label>
                <Form.Control 
                    type='city' 
                    placeholder='city'
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label className='mt-3'>Postal Code</Form.Label>
                <Form.Control 
                    type='postalCode' 
                    placeholder='postal code' 
                    value={postalCode} 
                    onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='province'>
                <Form.Label className='mt-3'>Province</Form.Label>
                <Form.Control 
                    type='province' 
                    placeholder='province' 
                    value={province} 
                    onChange={(e) => setProvince(e.target.value)}>
                </Form.Control>
            </Form.Group>
        <div className="d-grid mt-3">
            <Button  type='submit' variant='primary'>
                Continue
            </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
