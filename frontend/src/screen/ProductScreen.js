import React, {useEffect, useState, Fragment} from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form, Stack} from 'react-bootstrap';
import Rating from '../components/Rating';
import { getProduct, createProductReview } from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productsConstants';


const ProductScreen = () => {
    const {id} = useParams();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment,setComment] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails) // similar useContext
    const {loading, error, product} = productDetails;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error:errorProductReview, success:successProductReview} = productReviewCreate;
   
    useEffect(() => {
        if(successProductReview) {
            alert('Review Submitted');
            setRating(0);
            setComment('');
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        } else {
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(getProduct(id));     
    }, [dispatch,id,successProductReview]);

    const addToCart = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(id,{rating,comment}))
    }

  return (
    <Fragment>
    {loading? <Loader/> : error? <h4><Message variant='danger'>{error}</Message></h4> : <>
    <Meta title={product.name} />
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
     <Row>
        <Col md={4}>
            <Image src={product.image} alt='' fluid/>
        </Col>
        <Col md={5}>
            <ListGroup variant="flush">
                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>Price: </Col>
                        <Col>
                        ${product.price}
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col><small>Status:</small></Col>
                        <Col>
                          <small className={`${product.countInStock>0? 'text-success':'text-danger'}`}>
                            {product.countInStock>0? 'In Stock' : 'Out Of Stock'}
                          </small>
                         </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col><small>Qty:</small></Col>
                        <Col> 
                          <Form.Select  
                            size='sm' 
                            value={qty} 
                            onChange={(e) => setQty(e.target.value)}
                            disabled = {product.countInStock===0}
                            >
                            {[...Array(product.countInStock).keys()].map(x => <option key={x+1} value={x+1}>{x+1}</option>)}
                          </Form.Select>
                         </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Button 
                        onClick={addToCart}
                        disabled={product.countInStock===0}
                        >Add To Cart</Button>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Col>
     </Row>
     <Row className='mt-3'>
        <Col md={6}>
            <h3>Reviews</h3>
            {product.reviews.length === 0 && <Message>No Reviews</Message> } 
            <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating}/>
                        <p>{review.createdAt.substring(0,10)}</p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}
           
                 <ListGroup.Item>
                    <h5>Write a customer review</h5>
                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                    {userInfo? (
                        <Form onSubmit={submitHandler} className='mt-3'>
                            <Form.Group as={Row} controlId='rating'>
                                <Form.Label column sm="3">Rating</Form.Label>
                                <Col sm="9">
                                    <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option value="">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId='comment' className='mt-2'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as='textarea' value={comment} row='3' onChange={(e) => setComment(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Stack direction="horizontal" className='mt-3'>
                                <div className='ms-auto'>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </div>
                            </Stack>
                        </Form>
                    ) : <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>}
                </ListGroup.Item>
            </ListGroup>
        </Col>
     </Row>
     </>
    }
    </Fragment>
  )
}

export default ProductScreen
