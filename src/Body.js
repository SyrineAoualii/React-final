
import React, { useState, useEffect } from 'react';

const ProductWidget = ({ products, title, showAllFunction }) => {
  return (
    <div className="col-md-4">
      <div className="single-product-widget">
        <h2 className="product-wid-title">{title}</h2>
        <a href="#" onClick={showAllFunction} className="wid-view-more">View All</a>
        {products.map((product, index) => (
          <div key={index} className="single-wid-product">
            <a href={`/products/${product.id}`}>
              <img src={`${process.env.PUBLIC_URL}/images/${product.imageName}`} alt={product.name} className="product-thumb" />
            </a>
            <h2>
              <a href={`/products/${product.id}`}>{product.name}</a>
            </h2>
            <div className="product-wid-price">
              <ins>${product.price}</ins>
              {product.oldPrice && (
                <del>${product.oldPrice}</del>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Body() {
  const [topSellers, setTopSellers] = useState([]);
  const [topNew, setTopNew] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetch('http://localhost:3000/top-sellers-products')
      .then(response => response.json())
      .then(data => setTopSellers(data))
      .catch(error => console.error('Error fetching top sellers:', error));

    fetch('http://localhost:3000/top-new-products')
      .then(response => response.json())
      .then(data => setTopNew(data))
      .catch(error => console.error('Error fetching top new:', error));

    const viewedProducts = Object.keys(localStorage)
      .filter(key => key.startsWith('product_'))
      .map(key => JSON.parse(localStorage.getItem(key)));
    setRecentlyViewed(viewedProducts.reverse());
  }, []);

  const showAllProducts = () => {
    setVisibleCount(recentlyViewed.length);
  };

  return (
    <div>
      <div class="promo-area">
      <div class="zigzag-bottom"></div>
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-6">
            <div class="single-promo promo1">
              <i class="fa fa-refresh"></i>
              <p>30 Days return</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="single-promo promo2">
              <i class="fa fa-truck"></i>
              <p>Free shipping</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="single-promo promo3">
              <i class="fa fa-lock"></i>
              <p>Secure payments</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="single-promo promo4">
              <i class="fa fa-gift"></i>
              <p>New products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="product-widget-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <ProductWidget products={topSellers.slice(0, visibleCount)} title="Top Sellers" showAllFunction={() => setVisibleCount(topSellers.length)} />
            <ProductWidget products={recentlyViewed.slice(0, visibleCount)} title="Recently Viewed" showAllFunction={showAllProducts} />
            <ProductWidget products={topNew.slice(0, visibleCount)} title="Top New" showAllFunction={() => setVisibleCount(topNew.length)} />
          </div>
        </div>
      </div>
      <div class="brands-area">
        <div class="zigzag-bottom"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="brand-wrapper">
                        <div class="brand-list">
                            <img src={`${process.env.PUBLIC_URL}/img/brand1.png`} alt=""/>
                            <img src={`${process.env.PUBLIC_URL}/img/brand2.png`} alt=""/>
                            <img src={`${process.env.PUBLIC_URL}/img/brand3.png`} alt=""/>
                            <img src={`${process.env.PUBLIC_URL}/img/brand4.png`} alt=""/>
                            <img src={`${process.env.PUBLIC_URL}/img/brand5.png`} alt=""/>
                            <img src={`${process.env.PUBLIC_URL}/img/brand6.png`} alt=""/>
                            <img src={`${process.env.PUBLIC_URL}/img/brand1.png`} alt=""/>
                            <img src={`${process.env.PUBLIC_URL}/img/brand3.png`} alt=""/>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    </div>
  );
}

export default Body;
