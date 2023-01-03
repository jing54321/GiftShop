import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header/>
      <main  className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer/>     
    </Router>
  );
}

export default App
