import React, {Fragment, useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const {data} = await axios.get('/api/products');
    setProducts(data);
  }
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  },[])
  return (
    <Fragment>
      <h3>Latest Products</h3>
      <Row>
        {products.map(product =>
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
            )}
      </Row>
    </Fragment>
  )
}

export default HomeScreen
