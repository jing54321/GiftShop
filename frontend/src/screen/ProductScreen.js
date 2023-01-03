import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button} from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';


const ProductScreen = () => {
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const getProduct =  async (id) => {
        const {data} = await axios.get(`/api/products/${id}`);
        setProduct(data);
    }
    useEffect(() => {
        getProduct(id);
        //eslint-disable-next-line
    }, []);
  return (
    <>
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
                        <Button>Add To Cart</Button>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Col>
     </Row>
    </>
  )
}

export default ProductScreen
