import React, {useEffect, useState, Fragment} from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { getProduct } from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';


const ProductScreen = () => {
    const {id} = useParams();
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails) // similar useContext
    const {loading, error, product} = productDetails;
   
    useEffect(() => {
        dispatch(getProduct(id));     
    }, [dispatch,id]);

    const addToCart = () => {
        
        navigate(`/cart/${id}?qty=${qty}`);
    }

  return (
    <Fragment>
    {loading? <Loader/> : error? <h4><Message variant='danger'>{error}</Message></h4> : <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
     <Row>
        <Col md={5}>
            <Image src={product.image} alt='' fluid/>
        </Col>
        <Col md={4}>
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
     </>
    }
    </Fragment>
  )
}

export default ProductScreen
