import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        updateRecentlyViewed(data);
      })
      .catch(error => console.error('Error fetching product:', error));

    fetch(`http://localhost:3000/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

    loadRecentlyViewedProducts();
  }, [productId]);
 
  const loadRecentlyViewedProducts = () => {
    const viewedProducts = Object.keys(localStorage)
      .filter(key => key.startsWith('product_'))
      .map(key => JSON.parse(localStorage.getItem(key)));
    setRecentlyViewed(viewedProducts);
  };

  const updateRecentlyViewed = (newProduct) => {
    localStorage.setItem(`product_${newProduct.id}`, JSON.stringify(newProduct));
    loadRecentlyViewedProducts();
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
  const addToCart = () => {
    if (!product) {
      console.error('Product data is not loaded yet');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    const newItem = { ...product, quantity: 1 }; 
    createOrUpdateCart(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/Cart');
  };

  if (!product || categories.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="single-sidebar">
              <h2 className="sidebar-title">Recently Viewed</h2>
              {recentlyViewed.map((viewedProduct, index) => (
                <div key={index} className="thubmnail-recent">
                  <img src={`${process.env.PUBLIC_URL}/images/${viewedProduct.imageName}`} className="recent-thumb" alt={viewedProduct.name} />
                  <h2><Link to={`/products/${viewedProduct.id}`}>{viewedProduct.name}</Link></h2>
                  <div className="product-sidebar-price">
                    <ins>€{viewedProduct.price}</ins>
                    {viewedProduct.oldPrice && <del>€{viewedProduct.oldPrice}</del>}
                  </div>
                </div>
              ))}
            </div>

            <div className="single-sidebar">
              <h2 className="sidebar-title">Other Brands</h2>
              <ul>
                {categories.map(category => (
                  <li key={category.id}>
                    <Link to={`/categories/${category.id}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          <div className="col-md-8">
            <div className="product-content-right">
              <div className="product-breadcroumb">
                <Link to="/">Home</Link>
                <Link to="#">Category Name</Link>
                <Link to="#">{product.name}</Link>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="product-images">
                    <div className="product-main-img">
                      <img src={`${process.env.PUBLIC_URL}/images/${product.imageName}`} alt={product.name} />
                    </div>
                    <div class="product-gallery">
                                        <img src={`${process.env.PUBLIC_URL}/img/product-1.jpg`} alt=""/>
                                        <img src={`${process.env.PUBLIC_URL}/img/product-2.jpg`}alt=""/>
                                        <img src={`${process.env.PUBLIC_URL}/img/product-3.jpg`} alt=""/>
                                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="product-inner">
                    <h2 className="product-name">{product.name}</h2>
                    <div className="product-inner-price">
                      <ins>€{product.price}</ins>
                    </div>
                    <button onClick={addToCart} className="add_to_cart_button">Add to cart</button>
                    <div className="product-inner-category">
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 