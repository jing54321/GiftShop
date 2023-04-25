import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {getUserDetails, updateUser} from '../actions/userAction';
import {USER_UPDATE_RESET} from '../constants/userConstants'


const UserEditScreen = () => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    const userUpdate = useSelector(state => state.userUpdate);
    const {loading:loadingUpdate, error:errorUpdate, success} = userUpdate;
    
    useEffect(() => {
        if(success) {
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userlist');
            
        } else {
            if(!user.name || user._id !== id) {
                dispatch(getUserDetails(id));
           } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
           }
        }
       
    },[user,dispatch,id,success,navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id:id,name,email,isAdmin}))
      }
  
    return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1 className='text-center mb-3'>Edit User</h1>
      {(error || errorUpdate )&& <Message variant='danger'>{(error || errorUpdate)}</Message>}
      {(loading || loadingUpdate)&& <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
            <Form.Label className=''>User Name</Form.Label>
            <Form.Control 
                type='name' 
                placeholder='name'
                value={name} 
                onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label className='mt-3'>Email Address</Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='email'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='isadmin' className='mt-3'>
                <Form.Check
                    type='checkbox' 
                    label='Is Admin?'
                    value={isAdmin} 
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}>
                </Form.Check>
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

export default UserEditScreen;


