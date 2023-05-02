import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {createProduct} from '../actions/productActions';
import axios from 'axios';


const ProductCreateScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const productCreate = useSelector(state => state.productCreate);
    const {error,loading,success} = productCreate;
    
    
    useEffect(() => {
      if(success) {
        navigate('/admin/products')
      }
       
    },[dispatch,success,navigate]);

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        setUploading(true);

        try {
            const config = {
                headers : {
                    Authorization: `Bearer ${userInfo.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false)

        } catch (err) {
            console.error(err)
            setUploading(false)

        }
    }

    const submitHandler = (e) => {
       e.preventDefault();
       if(name === ''|| price === '' || image === '' || brand === '' || description === '' || countInStock === '' || category === '') {
            alert('Please fill the all fields!');
            return;
       }
       dispatch(createProduct({
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
      <h1 className='text-center mb-3'>Create Product</h1>
      {(error ) && <Message variant='danger'>{(error)}</Message>}
      {(loading) && <Loader/>}
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
                <Form.Control
                    className='mt-1'
                    type='file'
                    onChange={uploadFileHandler}>
                </Form.Control>
                {uploading && <Loader/>}
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
                    as='textarea' 
                    row='2'
                    placeholder='Enter description'
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}>
                </Form.Control>
            </Form.Group>
        <div className="d-grid mt-3">
            <Button  type='submit' variant='primary'>
                Create
            </Button>
        </div>
      </Form>
    </FormContainer>
    </>
   
  )
}

export default ProductCreateScreen;



