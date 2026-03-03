import React from 'react';
import { Star, DollarSign, Package, Users, Wrench, Truck } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Star size={40} />,
      title: '4.8+ Star Rating',
      description: 'Trusted by hundreds of happy customers'
    },
    {
      icon: <DollarSign size={40} />,
      title: 'Affordable Prices',
      description: 'Best quality at reasonable rates'
    },
    {
      icon: <Package size={40} />,
      title: 'Huge Variety',
      description: 'Wide range of bicycles and toys'
    },
    {
      icon: <Users size={40} />,
      title: 'Professional Team',
      description: 'Expert guidance and support'
    },
    {
      icon: <Wrench size={40} />,
      title: 'Bicycle Servicing',
      description: 'Complete maintenance available'
    },
    {
      icon: <Truck size={40} />,
      title: 'Home Delivery',
      description: 'Convenient doorstep delivery'
    }
  ];

  return (
    <section className="why-choose-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title-center">
            Why Choose <span className="text-accent">Centro</span>
          </h2>
          <p className="section-subtitle-center">
            Your trusted partner for bicycles and toys
          </p>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <div className="reason-icon">{reason.icon}</div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
