import React from 'react';
import { DollarSign, Headphones, Truck, Package } from 'lucide-react';

const AboutSection = () => {
  const features = [
    { icon: <DollarSign size={32} />, text: 'Affordable Pricing' },
    { icon: <Headphones size={32} />, text: 'Professional Service' },
    { icon: <Truck size={32} />, text: 'Home Delivery' },
    { icon: <Package size={32} />, text: 'Wide Collection' }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1588979355313-6711a095465f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDh8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseXxlbnwwfHx8fDE3NzI1MzM5MDd8MA&ixlib=rb-4.1.0&q=85"
              alt="Happy Family"
              className="about-img"
            />
          </div>

          <div className="about-content">
            <h2 className="section-title">
              About <span className="text-accent">Centro</span>
            </h2>
            
            <p className="about-text">
              The complete showroom for all kinds of bicycles and toys at Karassery Junction, Mukkam. 
              From gear cycles to battery cars for kids, we offer quality products at very reasonable prices.
            </p>
            
            <p className="about-text">
              Professional service, home delivery, and trusted by hundreds of happy customers across Kerala.
            </p>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
