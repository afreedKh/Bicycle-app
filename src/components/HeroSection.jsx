import React from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import HeaderImage from '../assets/Headerbackground.jpeg'

const HeroSection = () => {
  const handleViewCollection = () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9020300400', '_blank');
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img 
          src={HeaderImage}
          alt="Hero Background"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="rating-badge">
          ⭐ 4.8+ Star Rated Store
        </div>
        
        <h1 className="hero-title">
          Kerala's Complete<br />
          <span className="hero-accent">Bicycle & Toy</span> Showroom
        </h1>
        
        <p className="hero-subtitle">
          Premium Quality. Affordable Prices. Trusted Service.
        </p>

        <div className="hero-cta-buttons">
          <button onClick={handleViewCollection} className="btn-primary btn-large">
            View Collection
          </button>
          <button onClick={handleWhatsAppClick} className="btn-secondary btn-large">
            <MessageCircle size={20} />
            Chat on WhatsApp
          </button>
        </div>

        <div className="scroll-indicator">
          <ArrowDown size={24} className="scroll-arrow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
