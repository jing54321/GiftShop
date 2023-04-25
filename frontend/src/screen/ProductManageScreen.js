import React, {useEffect, useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Modal, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getProductsList, createProduct} from '../actions/productActions';
import {useNavigate} from 'react-router-dom';
import { deleteProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET,PRODUCT_DELETE_RESET } from '../constants/productsConstants';

const ProductManageScreen = () => {
    // First 4 rows for Modal control
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productList = useSelector(state => state.productList);
    const {error, loading, products} = productList;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const productDelete = useSelector(state => state.productDelete);
    const {error:errorDelete,loading:loadingDelete,success:successDelete} = productDelete;
    const productCreate = useSelector(state => state.productCreate);
    const {error:errorCreate,loading:loadingCreate,success:successCreate,product:createdProduct} = productCreate;

    useEffect(() => {
        
        dispatch({type:PRODUCT_CREATE_RESET})
        dispatch({type:PRODUCT_DELETE_RESET})

        if(!userInfo.isAdmin) {
            navigate('/login')
        } 
        if(successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(getProductsList());
        }
        
    },[dispatch, navigate, userInfo, successDelete,successCreate,createdProduct])
    //Create product
    const createProductHandler = () => {
        dispatch(createProduct())
    }
    //Delete product 
    const deleteHandler = () => {
        dispatch(deleteProduct(id));
    }
  return (
    <>
       <Row className="align-items-center ">
        <Col>
            <h2>Products</h2>
        </Col>
        <Col className="d-flex justify-content-end">
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i>Create Product
            </Button>
        </Col>
       </Row>
      {(loading || loadingDelete || loadingCreate)? <Loader/> : (error || errorDelete || errorCreate)? <Message variant='danger'>{(error || errorDelete)}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>Price</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => <tr key={product._id} className='text-center'>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm me-1'>
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>
                        <Button 
                            variant='danger' 
                            className='btn-sm' 
                            onClick={() => {handleShow(); setId(product._id)}}
                            >
                                <i className='fas fa-trash'></i>
                        </Button>
                    </td>
                    
                </tr>)}
            </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Delete Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete?</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={()=> {deleteHandler();handleClose()}}>
            Delete
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductManageScreen 
