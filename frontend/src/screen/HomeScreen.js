import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { getProductsList } from '../actions/productActions';

const HomeScreen = () => {
  //const [products, setProducts] = useState([]);
  const {keyword} = useParams()
  const {pageNumber} = useParams() || 1 ;
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const {loading, error, products, pages, page} =productList
  useEffect(() => {
    dispatch(getProductsList(keyword, pageNumber))//action
    
  },[dispatch,keyword, pageNumber])

  return (
    <Fragment>
      <Meta/>
      {!keyword? <ProductCarousel/> : <Link className='btn btn-light my-3' to='/'>Go Back</Link>}
      <h3 className="mt-2">Latest Products</h3>
      {loading? <Loader/>:error? <h4><Message variant='danger'/></h4> :(
        <>
          <Row>
            {products.map(product =>
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
            )}
          </Row>
          <Paginate total={pages} page={page}/>
        </>
      ) 
      
      }
      
   </Fragment>
  )
}

export default HomeScreen
