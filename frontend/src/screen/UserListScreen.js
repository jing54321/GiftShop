import React, {useEffect, useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Modal} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';

import {getUserList, deleteUser} from '../actions/userAction';
import {useNavigate} from 'react-router-dom';

const UserListScreen = () => {
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector(state => state.userList);
    const {error, loading, users} = userList;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const userDelete = useSelector(state => state.userDelete);
    const {success:successDelete} = userDelete;

    useEffect(() => {
        if(userInfo&&userInfo.isAdmin) {
            dispatch(getUserList())
        } else {
            navigate('/login')
        }
        
    },[dispatch, navigate, userInfo, successDelete])

    const deleteHandler = () => {
            dispatch(deleteUser(id));
    }
  return (
    <>
      <h2>Users</h2>
      {loading? <Loader/> : error? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <tr key={user._id} className='text-center'>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">{user.email}</a></td>
                    <td>{user.isAdmin ? (<i className="fas fa-check" style={{color:'green'}}></i>):(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
                    <td>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant='light' className='btn-sm me-1'>
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>
                        <Button 
                            variant='danger' 
                            className='btn-sm' 
                            onClick={() => {handleShow(); setId(user._id)}}
                            disabled = {user.isAdmin}
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

export default UserListScreen
