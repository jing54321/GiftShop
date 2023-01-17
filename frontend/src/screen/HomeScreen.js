import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getProductsList } from '../actions/productActions';

const HomeScreen = () => {
  //const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const {loading, error, products} =productList
  useEffect(() => {
    dispatch(getProductsList())//action
  },[dispatch])

  return (
    <Fragment>
      <h3>Latest Products</h3>
      {loading? <Loader/>:error? <h4><Message variant='danger'/></h4> : 
      <Row>
      {products.map(product =>
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
          </Col>
          )}
      </Row>
    }
      
    </Fragment>
  )
}

export default HomeScreen
