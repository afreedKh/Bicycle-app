import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => {
    window.location.href = 'tel:09020300400';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9020300400', '_blank');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section">
          <h1 className="logo-text">CENTRO</h1>
          <span className="logo-subtitle">BICYCLES & TOYS</span>
        </div>
        
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#reviews">Reviews</a>
          <a href="#location">Location</a>
        </nav>

        <div className="header-actions">
          <button onClick={handleCallClick} className="btn-ghost header-btn">
            <Phone size={18} />
            <span>Call</span>
          </button>
          <button onClick={handleWhatsAppClick} className="btn-primary header-btn">
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
