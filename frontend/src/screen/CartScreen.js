import React, {Fragment, useEffect} from 'react';
import Message from '../components/Message';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form, Card} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';

const CartScreen = () => {
    const {id} = useParams();
    const qty = new URLSearchParams(window.location.search).get("qty");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {cartItems} = useSelector(state => state.cart);
    
    useEffect(()=>{
        if(id) {
           dispatch(addToCart(id,qty))
        }
    }, [dispatch, id, qty])

    function removeFromCartHandler(id) {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }
    const calculateTotal = (items) => {
        const total = items.reduce((prev, item) => prev + item.qty*item.price,0);
        const dollarCanadaLocale = Intl.NumberFormat('en-US');
        return dollarCanadaLocale.format(total);
    }
    
  return (
    <Fragment>
        <h2 className='mb-3'>Shopping Cart</h2>
           <Row>
                <Col md={8}>
                    {cartItems.length ===0 ? (<Message>Your cart is empty <Link to='/'><Button className="btn-bg-info border-0">Go Back</Button></Link></Message>):(
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row className="justify-content-md-between align-items-center">
                                        <Col md={2}>
                                            <Image src={item.image} alt='' fluid rounded></Image>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2} >
                                            ${item.price}
                                        </Col>
                                        <Col xs={4} md={2} >
                                            <Form.Select  
                                                size='sm' 
                                                value={item.qty} 
                                                onChange={(e) => dispatch(addToCart(item.product, +e.target.value)) }
                                            >
                                            {[...Array(item.countInStock).keys()].map(x => <option key={x+1} value={x+1}>{x+1}</option>)}
                                            </Form.Select>
                                        </Col>
                                        <Col xs="auto" md={2}>
                                            <Button type='button' variant='right' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                  <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>SUBTOTAL ({cartItems.reduce((prev, item) => prev + Number(item.qty),0)}) ITEMS</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>${calculateTotal(cartItems)}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-grid">
                            <Button size='lg' className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                  </Card>     
                </Col>
           </Row>
    </Fragment>
  )
}

export default CartScreen
