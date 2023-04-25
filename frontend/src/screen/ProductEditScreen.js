import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {getProduct, updateProduct} from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productsConstants';


const ProductEditScreen = () => {
    const {productId} = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate;
    
    
    useEffect(() => {
        if(successUpdate) {
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate('/admin/products')
        } else {
            if(!product.name || product._id !== productId) {
                dispatch(getProduct(productId));
           } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
           }

        }
       
    },[dispatch,productId,product,successUpdate,navigate]);

    const submitHandler = (e) => {
       e.preventDefault();
       dispatch(updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        description,
        category,
        countInStock
       }));
      }
  
    return (
    <>
    
    <FormContainer>
    <Link to='/admin/products' className='btn btn-light my-3'>Go Back</Link>
      <h1 className='text-center mb-3'>Edit Product</h1>
      {(error || errorUpdate ) && <Message variant='danger'>{(error || errorUpdate)}</Message>}
      {(loading || loadingUpdate) && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
            <Form.Label className=''>Product Name</Form.Label>
            <Form.Control 
                type='name' 
                placeholder='name'
                value={name} 
                onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
            <Form.Group controlId='price'>
                <Form.Label className='mt-3'>Price</Form.Label>
                <Form.Control 
                    type='number' 
                    placeholder='enter price'
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='image' className='mt-3'>
            <Form.Label className='mt-3'>Image</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter image url'
                    value={image} 
                    onChange={(e) => setImage(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='brand' className='mt-3'>
            <Form.Label className='mt-3'>Brand</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter Brand'
                    value={brand} 
                    onChange={(e) => setBrand(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock' className='mt-3'>
            <Form.Label className='mt-3'>Count In Stock</Form.Label>
                <Form.Control 
                    type='number' 
                    placeholder='Enter stocks'
                    value={countInStock} 
                    onChange={(e) => setCountInStock(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='category' className='mt-3'>
            <Form.Label className='mt-3'>Category</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter category'
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='description' className='mt-3'>
            <Form.Label className='mt-3'>Description</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter description'
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}>
                </Form.Control>
            </Form.Group>
        <div className="d-grid mt-3">
            <Button  type='submit' variant='primary'>
                Update
            </Button>
        </div>
      </Form>
    </FormContainer>
    </>
   
  )
}

export default ProductEditScreen;


