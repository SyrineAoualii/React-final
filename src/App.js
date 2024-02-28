import React from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Carossel from './Carossel';
import Body from './Body';
import Footer from './Footer';
import Shop from './Shop';
import './index.css';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/index" />} />
        <Route path="/index" element={
          <>
            <Header />
            <Navbar />
            <Carossel />
            <Body />
            <Footer />
          </>
        } />
        <Route path="/products-lists/:productListId" element={
          <>
            <Header />
            <Navbar />
            <Shop />
            <Footer />
          </>
        } />
        <Route path="/products/:productId" element={
          <>
            <Header />
            <Navbar />
            <ProductDetail />
            <Footer />
          </>
        } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/carts/:cartId" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
