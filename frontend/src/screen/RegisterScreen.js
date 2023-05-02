import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import FormContainer from '../components/FormContainer';
import {register} from '../actions/userAction';


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message , setMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const userLogin = useSelector(state => state.userLogin);
    const {loading, error} = userRegister;
    const {userInfo} = userLogin;
    const redirect = location.search? location.search.split('=')[1] : '/'
    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    },[navigate,userInfo,redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }
        dispatch(register(name, email, password))
        setMessage(null);
      }
  
    return (
    <>
    <Meta title='Sign Up'/>
    <FormContainer>
      <h1 className='text-center mb-3'>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
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
                Register
            </Button>
        </div>
      </Form>
      <Row className='py-3'>
        <Col>
            Have an Account? {' '}
            <Link to={redirect? `/login?redirect=${redirect}`:'/login'}>
               Login
            </Link>
        </Col>
      </Row>
    </FormContainer>
    </>
  )
}

export default RegisterScreen;


