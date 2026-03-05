import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => { window.location.href = 'tel:09020300400'; };
  const handleWhatsAppClick = () => { window.open('https://wa.me/9020300400', '_blank'); };

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    if (isHome) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + hash);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo-section logo-link">
          <h1 className="logo-text">CENTRO</h1>
          <span className="logo-subtitle">BICYCLES &amp; TOYS</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#about"    onClick={(e) => handleNavClick(e, '#about')}>About</a>
          <a href="#products" onClick={(e) => handleNavClick(e, '#products')}>Products</a>
          <a href="#reviews"  onClick={(e) => handleNavClick(e, '#reviews')}>Reviews</a>
          <a href="#location" onClick={(e) => handleNavClick(e, '#location')}>Location</a>
        </nav>

        <div className="header-actions">
          <button onClick={handleCallClick} className="btn-ghost header-btn">
            <Phone size={18} /><span>Call</span>
          </button>
          <button onClick={handleWhatsAppClick} className="btn-primary header-btn">
            <MessageCircle size={18} /><span>WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
