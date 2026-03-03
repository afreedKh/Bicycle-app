import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    window.open('https://wa.me/9020300400', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`floating-whatsapp ${isVisible ? 'visible' : ''}`}
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default FloatingWhatsApp;
