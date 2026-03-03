import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const CTASection = () => {
  const handleCall = () => {
    window.location.href = 'tel:09020300400';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/9020300400', '_blank');
  };

  return (
    <section className="cta-section">
      <div className="cta-background"></div>
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Ride?<br />
            <span className="text-accent">Ready to Play?</span>
          </h2>
          <p className="cta-subtitle">
            Get in touch with us today and discover our amazing collection
          </p>
          <div className="cta-buttons">
            <button onClick={handleCall} className="btn-secondary btn-large">
              <Phone size={20} />
              Call Now
            </button>
            <button onClick={handleWhatsApp} className="btn-primary btn-large">
              <MessageCircle size={20} />
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
