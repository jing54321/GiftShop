import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {shippingAddress, paymentMethod, cartItems} = cart;
    //calculate prices
    const dollarCanadaLocale = Intl.NumberFormat('en-CA');
    const addDecimals = (num) => { return (Math.round(num*100)/100).toFixed(2)}
    cart.itemsPrice = addDecimals(cartItems.reduce((prev,item) => prev+=item.price*item.qty,0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100? 0 : 15);
    cart.taxPrice = addDecimals(cart.itemsPrice*0.13);
    cart.totalPrice = addDecimals(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice));

    const orderCreate = useSelector(state=>state.orderCreate);
    const {success, error, order} = orderCreate;
    
    useEffect(() => {
        if(success) {
            navigate(`/orders/${order._id}`)
        }
    },[navigate,success,order])
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems:cartItems,
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
    }
    
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>Shipping</h3>
                    <p>
                        <strong>Address : </strong>
                        {shippingAddress.address},{' '}  
                        {shippingAddress.city},{' '}  
                        {shippingAddress.postalCode},{' '} 
                        {shippingAddress.province}{' '}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Payment Method</h3>
                    <p>
                        <strong>Method : </strong>
                        {paymentMethod}{' '}  
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Order Items</h3>
                    {cartItems.length === 0? <Message>Your Cart is empty</Message>:(
                        <ListGroup variant='flush'>
                         {cartItems.map((item, idx) => 
                         <ListGroup.Item key={idx}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                </Col>
                                <Col>
                                    <Link to ={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={4}>
                                    <small> ${item.price} x {item.qty} = ${item.qty * item.price}</small>
                                </Col>
                            </Row>
                         </ListGroup.Item>)}    
                        </ListGroup>  
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${dollarCanadaLocale.format(cart.itemsPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${dollarCanadaLocale.format(cart.taxPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${dollarCanadaLocale.format(cart.totalPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={placeOrderHandler}>Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
