import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const { productListId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/products-lists/${productListId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCategoryName(data.name);
        setProducts(data.items);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [productListId]);

  const handleProductClick = (product) => {
    localStorage.setItem(`product_${product.id}`, JSON.stringify(product));
    navigate(`/products/${product.id}`);
  };
  const createOrUpdateCart = (newItem) => {
    let cartId = localStorage.getItem('cartId');
    const body = {
      items: [newItem]
    };

    let url = 'http://localhost:3000/carts';
    let method = 'POST';
    if (cartId) {
      url = `${url}/${cartId}`;
      method = 'PATCH';
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('cartId', data.id);
      navigate('/cart');
    })
    .catch(error => console.error('Error:', error));
  };
  const addToCart = (selectedProduct) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === selectedProduct.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...selectedProduct, quantity: 1 });
    }
    const newItem = { ...product, quantity: 1 };
      createOrUpdateCart(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    navigate('/Cart');
  };

  return (
    <div>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>{categoryName}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single-product-area">
        <div className="container">
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-3 col-sm-6">
                <div className="single-shop-product">
                  <div className="product-upper">
                    <img src={`${process.env.PUBLIC_URL}/images/${product.imageName}`} alt={product.name} />
                  </div>
                  <h2><a onClick={() => handleProductClick(product)}>{product.name}</a></h2>
                  <div className="product-carousel-price">
                    <ins>${product.price}</ins>
                    {product.discountRate && (
                      <del>${(product.price * (100 + product.discountRate) / 100).toFixed(2)}</del>
                    )}
                  </div>
                  <div className="product-option-shop">
                    <button onClick={() => addToCart(product)} className="add_to_cart_button">Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
    </div>
  );
}

export default Shop;
