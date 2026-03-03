import React from 'react';
import { MessageCircle } from 'lucide-react';
import { productData } from '../data/mockData';

const ProductCategories = () => {
  const handleEnquire = (productName) => {
    const message = `Hi! I'm interested in ${productName}. Can you provide more details?`;
    window.open(`https://wa.me/9020300400?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="products" className="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title-center">
            Our <span className="text-accent">Collection</span>
          </h2>
          <p className="section-subtitle-center">
            Premium bicycles and toys for the entire family
          </p>
        </div>

        <div className="products-category">
          <h3 className="category-title">🚴 Bicycles</h3>
          <div className="product-grid">
            {productData.bicycles.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button 
                      onClick={() => handleEnquire(product.name)}
                      className="btn-primary btn-small"
                    >
                      <MessageCircle size={16} />
                      Enquire Now
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="products-category">
          <h3 className="category-title">🧸 Toys & Kids Products</h3>
          <div className="product-grid">
            {productData.toys.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button 
                      onClick={() => handleEnquire(product.name)}
                      className="btn-primary btn-small"
                    >
                      <MessageCircle size={16} />
                      Enquire Now
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
