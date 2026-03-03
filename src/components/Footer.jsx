import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">CENTRO</h3>
            <p className="footer-tagline">Ride the Joy. Play the Fun.</p>
            <p className="footer-description">
              Kerala's most trusted bicycle and toy showroom. Quality products at affordable prices.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><a href="#about">About Us</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#location">Location</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Products</h4>
            <ul className="footer-list">
              <li><a href="#products">Bicycles</a></li>
              <li><a href="#products">Gear Cycles</a></li>
              <li><a href="#products">Kids Cycles</a></li>
              <li><a href="#products">Toys & Games</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={18} />
                <span>MP Arcade, Karassery, Mukkam, Kerala 673602</span>
              </li>
              <li>
                <Phone size={18} />
                <span>090203 00400</span>
              </li>
              <li>
                <Mail size={18} />
                <span>info@centrobicycles.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Centro Bicycles & Toys. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
