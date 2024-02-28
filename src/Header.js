import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
  };
  const goToCart = () => {
    navigate('/Cart');
  };
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
    const cartId = localStorage.getItem('cartId');
      if (cartId) {
        fetch(`http://localhost:3000/carts/${cartId}`)
          .then(response => response.json())
          .then(data => {
            setCartItems(data.items); 
          })
          .catch(error=> console.error('Error fetching cart:', error));
      }
  }, []);

  return (
    <div className="site-branding-area">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="logo" style={{ width: '100px', height: '100px' }}>
              <h1><a href="/"><img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" /></a></h1>
            </div>
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              style={{ marginTop: '30px' }}
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="button"
              value="Search"
              onClick={handleSearch}
            />
          </div>
          <div className="col-sm-4">
            <div className="shopping-item" onClick={goToCart} style={{ cursor: 'pointer' }}>
              Cart: <span className="cart-amunt">{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</span>
              <i className="fa fa-shopping-cart"></i>
              <span className="product-count">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
