import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
import {login} from '../actions/userAction';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;
    const redirect = location.search? location.search.split('=')[1] : '/';
    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    },[navigate,userInfo,redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
      }
  
    return (
    <>
      <Meta title='Sign In'/>
      <FormContainer>
      <h1 className='text-center mb-4'>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
                type='email' 
                placeholder='email'
                value={email} 
                onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
            <Form.Label className='mt-3'>Password</Form.Label>
            <Form.Control 
                type='password' 
                placeholder='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <div className="d-grid mt-3">
            <Button  type='submit' variant='primary'>
                Sign In
            </Button>
        </div>
        
      </Form>
      <Row className='py-3'>
        <Col>
            New Customer? {' '}
            <Link to={redirect? `/register?redirect=${redirect}`:'/register'}>
                Register
            </Link>
        </Col>
      </Row>
    </FormContainer>
    </>
    
  )
}

export default LoginScreen
