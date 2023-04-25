import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen  from './screen/RegisterScreen';
import ProfileScreen  from './screen/ProfileScreen';
import ShippingScreen  from './screen/ShippingScreen';
import PaymentScreen  from './screen/PaymentScreen';
import PlaceOrderScreen  from './screen/PlaceOrderScreen';
import OrderScreen  from './screen/OrderScreen';
import UserListScreen  from './screen/UserListScreen';
import UserEditScreen  from './screen/UserEditScreen';
import ProductManageScreen  from './screen/ProductManageScreen';
import ProductEditScreen  from './screen/ProductEditScreen';

const App = () => {
  return (
    <Router>
      <Header/>
      <main  className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='/cart/:id?' element={<CartScreen/>}/>
            <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/profile' element={<ProfileScreen/>}/>
            <Route path='/shipping' element={<ShippingScreen/>}/>
            <Route path='/payment' element={<PaymentScreen/>}/>
            <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
            <Route path='/orders/:id' element={<OrderScreen/>}/>
            <Route path='/admin/userlist' element={<UserListScreen/>}/>
            <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
            <Route path='/admin/products' element={<ProductManageScreen/>}/>
            <Route path='/admin/products/:productId/edit' element={<ProductEditScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer/>     
    </Router>
  );
}

export default App
