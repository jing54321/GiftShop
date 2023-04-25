import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'
import {Link, useParams} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
    
    const {id} = useParams();//order id
    const [sdkReady, setSdkReady] = useState(false); 
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, error, loading} = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const {success:successPay, error:payError, loading:loadingPay} = orderPay;
    const dollarCanadaLocale = Intl.NumberFormat('en-CA');
    useEffect(() => {
        const addPayPalScript = async () => {
            const {data:clientId} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=CAD`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.append(script);
        }

        if(!order || successPay || order._id !== id) {
            //orderPay reset
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(id))

        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
        
    },[order,id, dispatch, successPay])

    const successPaymentHandler = (paymentResult) => {
            
            dispatch(payOrder(id, paymentResult))
    }

  return (
    <>
    {loading? <Loader/> : error? <Message variant='danger'>{error}</Message>: (
        <>
        <h2>Order No: {order._id}</h2>
        <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>Shipping</h3>
                    <p><strong>Name : </strong> {order.user.name}</p>
                    <p>
                        <strong>Email : </strong>
                        <a href={`mailto:${order.user.email}`} target="_blank" rel="noopener noreferrer">{order.user.email}</a></p>
                    <p>
                        <strong>Address : </strong>
                        {order.shippingAddress.address},{' '}  
                        {order.shippingAddress.city},{' '}  
                        {order.shippingAddress.postalCode},{' '} 
                        {order.shippingAddress.province}{' '}
                    </p>
                    {order.isDelivered? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Payment Method</h3>
                    <p>
                        <strong>Method : </strong>
                        {order.paymentMethod}{' '}  
                    </p>
                    {order.isPaid? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid {payError && <p>{payError}</p>}</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Order Items</h3>
                        <ListGroup variant='flush'>
                         {order.orderItems.map((item, idx) => 
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
                            <Col>${dollarCanadaLocale.format(order.itemsPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${dollarCanadaLocale.format(order.taxPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${dollarCanadaLocale.format(order.totalPrice)}</Col>
                        </Row>
                    </ListGroup.Item>

                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader/>}
                            {!sdkReady ? <Loader/> : <PayPalButton amount ={order.totalPrice} options={{currency:"CAD"}} onSuccess={successPaymentHandler}/>}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </Col>
      </Row>
        </>
    )}
    </>
    )
}

export default OrderScreen
