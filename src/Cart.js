import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
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

  const updateQuantity = (index, delta) => {
    const newCartItems = [...cartItems];
    const item = newCartItems[index];
    const newQuantity = item.quantity + delta;

    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      newCartItems.splice(index, 1); 
    }

    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };




  const handleCheckout = () => {
    navigate('/Checkout');
  };

  return (
    <div>
      <div className="site-branding-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="logo" style={{ width: '100px', height: '100px' }}>
                <h1><a href="/"><img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" /></a></h1>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="shopping-item">
                Cart: <span className="cart-amunt">{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</span>
                <i className="fa fa-shopping-cart"></i>
                <span className="product-count">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single-product-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-content-right">
                <table className="shop_table cart">
                  <thead>
                  <tr>
                        <th className="product-remove">&nbsp;</th>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                  </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr className="cart_item" key={index}>
                        <td className="product-remove">
                            <a title="Remove this item" className="remove" href="#">×</a> 
                          </td>
                          <td className="product-thumbnail">
                            <a href="single-product.html"><img width="145" height="145" alt={item.name} className="shop_thumbnail" src={`${process.env.PUBLIC_URL}/images/${item.imageName}`} /></a>
                          </td>
                          <td className="product-name">
                            <a href="single-product.html">{item.name}</a> 
                          </td>
                          <td className="product-price">
                            <span className="amount">{item.price}€</span> 
                          </td>
                        <td className="product-quantity">
                          <div className="quantity buttons_added">
                            <input type="button" className="minus" value="-" onClick={() => updateQuantity(index, -1)} />
                            <input type="number" size="4" className="input-text qty text" title="Qty" value={item.quantity} readOnly />
                            <input type="button" className="plus" value="+" onClick={() => updateQuantity(index, 1)} />
                          </div>
                        </td>
 
                        <td className="product-subtotal">
                            <span className="amount">{(item.price * item.quantity).toFixed(2)} €</span> 
                          </td>
                      </tr>
                    ))}
                    <tr>
                          <td className="actions" colSpan="6">
                              <input type="button" value="Checkout" name="proceed" className="checkout-button button alt wc-forward" onClick={handleCheckout} />
                          </td>
                    </tr>
                  </tbody>
                </table>
                <div class="cart-collaterals">


  <div class="cross-sells">
    <h2>You may be interested in...</h2>
    <ul class="products">
        <li class="product">
            <a href="single-product.html">
                <img width="325" height="325" alt="T_4_front" class="attachment-shop_catalog wp-post-image" src="img/product-2.jpg"/>
                <h3>Ship Your Idea</h3>
                <span class="price"><span class="amount">20.00 €</span></span>
            </a>

            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="22" rel="nofollow" href="single-product.html">Add to Cart</a>
        </li>

        <li class="product">
            <a href="single-product.html">
                <img width="325" height="325" alt="T_4_front" class="attachment-shop_catalog wp-post-image" src="img/product-4.jpg"/>
                <h3>Ship Your Idea</h3>
                <span class="price"><span class="amount">20.00 €</span></span>
            </a>

            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="22" rel="nofollow" href="single-product.html">Add to Cart</a>
        </li>
    </ul>
</div>


<div className="cart_totals">
  <h2>Cart Totals</h2>
  <table cellspacing="0">
    <tbody>
      <tr className="cart-subtotal">
        <th>Cart Subtotal</th>
        <td><span className="amount">{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</span></td>
      </tr>
      <tr className="shipping">
        <th>Taxe (20%)</th>
        <td>{(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.20).toFixed(2)} €</td>
      </tr>
      <tr className="order-total">
        <th>Order Total</th>
        <td><strong><span className="amount">{(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.20).toFixed(2)} €</span></strong></td>
      </tr>
    </tbody>
  </table>
</div>



</div>
      </div>
    </div>
  </div>
  </div>
   </div>
    <div class="footer-top-area">
        <div class="zigzag-bottom"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-sm-6">
                    <div class="footer-about-us">
                        <h2><span>MyStore</span></h2>
                        <p>SES Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi veritatis magni at?</p>

                    </div>
                </div>
                
                <div class="col-md-4 col-sm-6">
                    <div class="footer-menu">
                        <h2 class="footer-wid-title">Categories </h2>
                        <ul>
                            <li><a href="#">LG</a></li>
                            <li><a href="#">Samsung</a></li>
                            <li><a href="#">Sony</a></li>
                            <li><a href="#">Apple</a></li>
                            <li><a href="#">Huawei</a></li>
                        </ul>                        
                    </div>
                </div>
                
   
                
                <div class="col-md-4 col-sm-6">
                    <div class="footer-newsletter">
                        <h2 class="footer-wid-title">Newsletter</h2>
                        <p>Sign up to our newsletter and get exclusive deals you wont find anywhere else straight to your inbox!</p>
                        <div class="newsletter-form">
                            <form action="#">
                                <input type="email" placeholder="Type your email"/>
                                <input type="submit" value="Subscribe"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Cart;