import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductCategories from '../components/ProductCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import ReviewsSection from '../components/ReviewsSection';
import StoreVisit from '../components/StoreVisit';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <ProductCategories />
      <WhyChooseUs />
      <ReviewsSection />
      <StoreVisit />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
