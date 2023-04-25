import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../actions/userAction';
import {useNavigate, useLocation} from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const userDetails = useSelector(state => state.userDetails);
  const {user} = userDetails;
  const {userInfo} = userLogin;
  const navigate = useNavigate();
  const location = useLocation();
  const logoutHandler = () => {
      if(location.pathname.includes('admin')) {
        dispatch(logout());
        navigate('/login')
      } else {
        dispatch(logout());
      }
      
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><i className="fa-solid fa-gift"></i> Gift Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/cart'>
                <Nav.Link><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
              </LinkContainer>
              {(user.name && user._id === userInfo._id && !userInfo.isAdmin)? (
              <NavDropdown title={user.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>) : (user.name && user.isAdmin)? (
              <NavDropdown title={user.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>User List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/products'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>) : (userInfo? 
              (<NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  {userInfo.isAdmin && (<LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>User List</NavDropdown.Item>
                </LinkContainer>)}
                  {userInfo.isAdmin && (<LinkContainer to='/admin/products'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>)}
              </NavDropdown>) : (<LinkContainer to='/login'>
                <Nav.Link><i className="fa-solid fa-user"></i> Sign In</Nav.Link>
              </LinkContainer>))
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
