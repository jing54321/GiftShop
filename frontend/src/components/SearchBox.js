import React, {useState} from 'react';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap'

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    }
   
    return ComponentWithRouterProp;
}

const SearchBox = () => {
  const [keyword,setKeyword] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
        navigate(`/search/${keyword}`);
    } else {
        navigate('/')
    }
    setKeyword('');
  }
  
  return (
    <Form onSubmit={submitHandler}>
        <Form.Group as={Row} >
            <Col xs={6} md={6} lg={10}>
                <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='search product...' value={keyword} >
                </Form.Control>
            </Col>
            <Col xs={2} md={2} lg={2}>
                <Button column type='submit' variant='outline-success' className='p-2'>
                        Search
                </Button>
            </Col>
        </Form.Group>
        
    </Form>
  )
}

export default withRouter(SearchBox);
