import React from 'react';
import Header from '../components/Header';
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
      <Header />
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
