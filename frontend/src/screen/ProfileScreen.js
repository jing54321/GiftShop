import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, updateUserProfile} from '../actions/userAction';
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message , setMessage] = useState(null);
    const navigate = useNavigate();
    //const location = useLocation();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;
    
    useEffect(() => {
        if(!userInfo) {
            navigate('/login');
        } else {
            if(!user.name) {
                //initial user => user : {} --> automatic execute below dispatch
                // get user : {.......} 
                dispatch(getUserDetails('profile'))
            } 
            else {
                //After above dispatch re-execute this useEffect.  
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,navigate,userInfo,user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else{
            dispatch(updateUserProfile({id:user._id,name, email, password}))
            setTimeout(() => {
                dispatch({type:USER_UPDATE_PROFILE_RESET})
            }, 2000);
            
            }
        }
      
  
    return (
    <Row>
        <Col md={4}>
            <h2 className='text-center mb-3'>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
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
                    <Form.Group controlId='password'>
                        <Form.Label className='mt-3'>Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label className='mt-3'>Confirm Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Confirm password' 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                <div className="d-grid mt-3">
                    <Button  type='submit' variant='primary'>
                        Update
                    </Button>
                </div>
            </Form>
            <Row className='py-3'>
                <Col>
                    <Link to={'/'}>
                    Go Back?
                    </Link>
                </Col>
            </Row>
        </Col>
        <Col md={8}>
            <h2>My orders</h2>
        </Col>
    </Row>
   
        
  )
}

export default ProfileScreen;



