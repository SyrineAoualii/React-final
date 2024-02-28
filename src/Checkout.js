import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

 
function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.20; 
    const tax = subtotal * taxRate; 
    const total = subtotal + tax; 
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postCode, setPostCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const [selectedCivility, setSelectedCivility]=useState('Mr')
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
    const createOrUpdateOrder = () => {

      const body = {
        customer: {
          email: email,
          phone: phone,
          billingAddress: {
   
            civility: selectedCivility,
            firstName: firstName,
            lastName: lastName,
            zipCode: postCode,
            street: address1,
            companyName: company,
            country: country,
            city: city
          },
          shippingAddress: {
   
            civility: selectedCivility,
            firstName: firstName,
            lastName: lastName,
            zipCode: postCode,
            street: address1,
            companyName: company,
            country: country,
            city: city
          },
        },
        paymentMethod: paymentMethod,
      };

    
      let url = 'http://localhost:3000/orders';
      let method = 'POST';
      let orderId = localStorage.getItem('orderId');
    
      if (orderId) {
        url = `${url}/${orderId}`;
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
        localStorage.setItem('orderId', data.id);
        navigate('/index');
      })
      .catch(error => console.error('Error:', error));
    };
    const handlePaymentMethodChange = (event) => {
      setPaymentMethod(event.target.value);
  };
  
    const handleFormSubmit = (event) => {
      event.preventDefault(); 
      createOrUpdateOrder();
    };
    const goToCart = () => {
      navigate('/Cart');
    };
    const handleCivility = (event) => {
      setSelectedCivility(event.target.value);
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
              <div className="shopping-item" onClick={goToCart}>
                Cart: <span className="cart-amunt">{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</span>
                <i className="fa fa-shopping-cart"></i>
                <span className="product-count">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-big-title-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="product-bit-title text-center">
                        <h2>Checkout</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="single-product-area">
        <div class="zigzag-bottom"></div>
        <div class="container">
            <div class="row">

                
                <div class="col-md-12">
                    <div class="product-content-right">
                        <div class="woocommerce">
                       

                            <form enctype="multipart/form-data" action="#" class="checkout" method="post" name="checkout">

                                <div id="customer_details" class="col2-set">
                                    <div class="col-6">
                                        <div class="woocommerce-billing-fields">
                                            <h3>Billing Details</h3>
                                            <p id="billing_country_field" class="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated">
                                                <label class="" for="billing_country">Civility <abbr title="required" class="required">*</abbr>
                                                </label>
												                    
                                                <select
                                                       className="country_to_state country_select"
                                                       id="shipping_country"
                                                       name="shipping_country"
                                                       onChange={handleCivility}
                                                       value={selectedCivility}  >
                                                          <option value="Mr">Mr</option>
                                                          <option value="Mlle">Mlle</option> 
                                                          <option value="Mme">Mme</option>
                                                       </select>
                                                       
                                            </p>
                                            <p id="billing_first_name_field" className="form-row form-row-first validate-required">
                                                 <label className="" htmlFor="billing_first_name">First Name <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={firstName}
                                                   onChange={(e) => setFirstName(e.target.value)}
                                                   id="billing_first_name"
                                                   name="billing_first_name"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <p id="billing_last_name_field" className="form-row form-row-last validate-required">
                                                 <label className="" htmlFor="billing_last_name">Last Name <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={lastName}
                                                   onChange={(e) => setLastName(e.target.value)}
                                                   id="billing_last_name"
                                                   name="billing_last_name"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <div class="clear"></div>
                                            <p id="billing_company_field" className="form-row form-row-wide">
                                                 <label className="" htmlFor="billing_company">Company Name <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={company}
                                                   onChange={(e) => setCompany(e.target.value)}
                                                   id="billing_company"
                                                   name="billing_company"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <p id="billing_address_1_field" className="form-row form-row-wide address-field validate-required">
                                                 <label className="" htmlFor="billing_address_1">Address <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={address1}
                                                   placeholder='Street address'
                                                   onChange={(e) => setAddress1(e.target.value)}
                                                   id="billing_address_1"
                                                   name="billing_address_1"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <p id="billing_address_2_field" className="form-row form-row-wide address-field validate-required">

                                                 <input
                                                   type="text"
                                                   value={address2}
                                                   placeholder="Apartment, suite, unit etc. (optional)"
                                                   onChange={(e) => setAddress2(e.target.value)}
                                                   id="billing_address_2"
                                                   name="billing_address_2"
                                                  className="input-text "
                                                  />
                                            </p>

                                            <p id="billing_city_field" className="form-row form-row-wide address-field validate-required">
                                                 <label className="" htmlFor="billing_city">Town / City <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={city}
                                                   placeholder='Town / City'
                                                   onChange={(e) => setCity(e.target.value)}
                                                   id="billing_city"
                                                   name="billing_city"
                                                  className="input-text "
                                                  />
                                            </p>

                                            <p id="billing_state_field" className="form-row form-row-wide address-field validate-required">
                                                 <label className="" htmlFor="billing_state">Country <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={country}
                                                   placeholder='State / Country'
                                                   onChange={(e) => setCountry(e.target.value)}
                                                   id="billing_state"
                                                   name="billing_state"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <p id="billing_postcode_field" className="form-row form-row-wide address-field validate-required">
                                                 <label className="" htmlFor="billing_postcode">Postcode <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={postCode}
                                                   placeholder='Postcode / Zip'
                                                   onChange={(e) => setPostCode(e.target.value)}
                                                   id="billing_postcode"
                                                   name="billing_postcode"
                                                  className="input-text "
                                                  />
                                            </p>

                                            <div class="clear"></div>
                                            <p id="billing_email_field" className="form-row form-row-first validate-required validate-email">
                                                 <label className="" htmlFor="billing_email">Email Address <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={email}
                                                   onChange={(e) => setEmail(e.target.value)}
                                                   id="billing_email"
                                                   name="billing_email"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <p id="billing_phone_field" className="form-row form-row-first validate-required validate-phone">
                                                 <label className="" htmlFor="billing_phone">Phone <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={phone}
                                                   onChange={(e) => setPhone(e.target.value)}
                                                   id="billing_phone"
                                                   name="billing_phone"
                                                  className="input-text "
                                                  />
                                            </p>

                                            
                                            <div class="clear"></div>


                                           


                                        </div>
                                    </div>

                                    <div class="col-6">
                                        <div class="woocommerce-shipping-fields">
                                            <h3 id="ship-to-different-address">
                        <label class="checkbox" for="ship-to-different-address-checkbox">Ship to a different address?</label>
                        <input type="checkbox" value="1" name="ship_to_different_address" checked="checked" class="input-checkbox" id="ship-to-different-address-checkbox"/>
                        </h3>
                        <div className="shipping_address" style={{ display: 'block' }}>

                                                <p id="shipping_country_field" class="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated">
                                                    <label class="" for="shipping_country">Civility <abbr title="required" class="required">*</abbr>
                                                    </label>

                                                    <select
                                                       className="country_to_state country_select"
                                                       id="shipping_country"
                                                       name="shipping_country"
                                                       onChange={handleCivility}
                                                       value={selectedCivility}  >
                                                          <option value="Mr">Mr</option>
                                                          <option value="Mlle">Mlle</option> 
                                                          <option value="Mme">Mme</option>
                                                       </select>
                                                       
                                                  

                                                </p>

                                                <p id="shipping_first_name_field" className="form-row form-row-first validate-required">
                                                 <label className="" htmlFor="shipping_first_name">First Name <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={firstName}
                                                   onChange={(e) => setFirstName(e.target.value)}
                                                   id="shipping_first_name"
                                                   name="shipping_first_name"
                                                  className="input-text "
                                                  />
                                            </p>

                                            <p id="shipping_last_name_field" className="form-row form-row-last validate-required">
                                                 <label className="" htmlFor="shipping_last_name">Last Name <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={lastName}
                                                   onChange={(e) => setLastName(e.target.value)}
                                                   id="shipping_last_name"
                                                   name="shipping_last_name"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <p id="shipping_company_field" className="form-row form-row-wide">
                                                 <label className="" htmlFor="shipping_company">Company Name <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={company}
                                                   onChange={(e) => setCompany(e.target.value)}
                                                   id="shipping_company"
                                                   name="shipping_company"
                                                  className="input-text "
                                                  />
                                            </p>

                                            <p id="shipping_address_1_field" className="form-row form-row-wide address-field validate-required">
                                                 <label className="" htmlFor="shipping_company">Address <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={address1}
                                                   placeholder='Street Address'
                                                   onChange={(e) => setAddress1(e.target.value)}
                                                   id="shipping_address_1"
                                                   name="shipping_address_1"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <p id="billing_address_2_field" className="form-row form-row-wide address-field validate-required">

                                                 <input
                                                   type="text"
                                                   value={address2}
                                                   placeholder="Apartment, suite, unit etc. (optional)"
                                                   onChange={(e) => setAddress2(e.target.value)}
                                                   id="billing_address_2"
                                                   name="billing_address_2"
                                                  className="input-text "
                                                  />
                                            </p>

                                                <p id="shipping_city_field" className="form-row form-row-wide address-field validate-required">
                                                 <label className="" htmlFor="shipping_city">Town / City <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={city}
                                                   placeholder='Town / City'
                                                   onChange={(e) => setCity(e.target.value)}
                                                   id="shipping_city"
                                                   name="shipping_city"
                                                  className="input-text "
                                                  />
                                            </p>

                                            <p id="shipping_state_field" className="form-row form-row-wide address-field validate-required">
                                                 <label className="" htmlFor="shipping_state">Country <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={country}
                                                   placeholder='State / Country'
                                                   onChange={(e) => setCountry(e.target.value)}
                                                   id="shipping_state"
                                                   name="shipping_state"
                                                  className="input-text "
                                                  />
                                            </p>
                                            <p id="shipping_postcode_field" className="form-row form-row-wide address-field validate-required">
                                                 <label className="" htmlFor="shipping_postcode">Postcode <abbr title="required" className="required">*</abbr>
                                                 </label>
                                                 <input
                                                   type="text"
                                                   value={postCode}
                                                   placeholder='Postcode / Zip'
                                                   onChange={(e) => setPostCode(e.target.value)}
                                                   id="shipping_postcode"
                                                   name="shipping_postcode"
                                                  className="input-text "
                                                  />
                                            </p>

                                                <div class="clear"></div>


                                            </div>





                                            <p id="order_comments_field" class="form-row notes">
                                                <label class="" for="order_comments">Order Notes</label>
                                                <textarea cols="5" rows="2" placeholder="Notes about your order, e.g. special notes for delivery." id="order_comments" class="input-text " name="order_comments"></textarea>
                                            </p>


                                        </div>

                                    </div>

                                </div>

                                <h3 id="order_review_heading">Your order</h3>

                                <div id="order_review" style={{ position: 'relative' }}>

                                <table className="shop_table">
          <thead>
            <tr>
              <th className="product-name">Product</th>
              <th className="product-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr className="cart_item" key={index}>
                <td className="product-name">
                  {item.name} <strong className="product-quantity">× {item.quantity}</strong>
                </td>
                <td className="product-total">
                  <span className="amount">£{(item.price * item.quantity).toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="cart-subtotal">
              <th>Cart Subtotal</th>
              <td><span className="amount">£{subtotal.toFixed(2)}</span></td>
            </tr>
            <tr className="shipping">
              <th>Taxe (20%)</th>
              <td>{tax.toFixed(2)} €</td>
            </tr>
            <tr className="order-total">
              <th>Order Total</th>
              <td><strong><span className="amount">£{total.toFixed(2)}</span></strong></td>
            </tr>
          </tfoot>
        </table>
                                    <div id="payment">
                                        <ul class="payment_methods methods">
                                            <li class="payment_method_bacs">
                                            <input
                                             type="radio"
                                             value="bacs"
                                             name="payment_method"
                                              className="input-radio"
                                              id="payment_method_bacs"
                                              onChange={handlePaymentMethodChange}
                                              checked={paymentMethod === 'bacs'}
                                                    />
                                                <label for="payment_method_bacs">Direct Bank Transfer </label>
                                                <div class="payment_box payment_method_bacs">
                                                    <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                </div>
                                            </li>
                                            <li class="payment_method_cheque">
                                            <input
                                             type="radio"
                                             value="cheque"
                                             name="payment_method"
                                             className="input-radio"
                                             id="payment_method_cheque"
                                             onChange={handlePaymentMethodChange}
                                             checked={paymentMethod === 'cheque'}
                                               />

                                                <label for="payment_method_cheque">Cheque Payment </label>
                                                <div style={{ display: 'none' }} className="payment_box payment_method_cheque">


                                                    <p>Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                                </div>
                                            </li>
                                            <li class="payment_method_paypal">
                                            <input
                                                 type="radio"
                                                 value="paypal"
                                                 name="payment_method"
                                                 className="input-radio"
                                                 id="payment_method_paypal"
                                                 onChange={handlePaymentMethodChange}
                                                checked={paymentMethod === 'paypal'}
                                            />
                                                <label htmlFor="payment_method_paypal">PayPal <img alt="PayPal Acceptance Mark" src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png"/><a title="What is PayPal?" onClick={() => window.open('https://www.paypal.com/gb/webapps/mpp/paypal-popup', 'WIPaypal', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700')} className="about_paypal" href="https://www.paypal.com/gb/webapps/mpp/paypal-popup">What is PayPal?</a></label>

                                                <div className="payment_box payment_method_bacs" style={{ display: paymentMethod === 'bacs' ? 'block' : 'none' }}>
                                                    <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                </div>

                                            </li>
                                        </ul>

                                        <div class="form-row place-order">

                                        <button onClick={handleFormSubmit} className="add_to_cart_button">Place Order</button>


                                        </div>

                                        <div class="clear"></div>

                                    </div>
                                </div>
                            </form>

                        </div>                       
                    </div>                    
                </div>
            </div>
        </div>
    </div>
    </div>


  )
}

export default Checkout


