import React, { useRef, useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, ChevronLeft, ChevronRight, Loader2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

// ─── Carousel ────────────────────────────────────────────────────────────────
const CategoryCarousel = ({ products, onEnquire }) => {
  const scrollRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [products]); // re-run when products load so arrow state is correct

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  if (products.length === 0) {
    return (
      <p className="carousel-empty">No products added yet.</p>
    );
  }

  return (
    <div className="carousel-wrapper">
      <button
        className={`carousel-arrow carousel-arrow--left ${!canLeft ? 'carousel-arrow--hidden' : ''}`}
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
      >
        <ChevronLeft size={22} />
      </button>

      <div className="carousel-track" ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className="carousel-card product-card">
            <div className="product-image-wrapper">
              {product.imageUrl
                ? <img src={product.imageUrl} alt={product.name} className="product-image" />
                : <div className="product-image-placeholder"><MessageCircle size={32} /></div>
              }
              <div className="product-overlay">
                <button onClick={() => onEnquire(product)} className="btn-primary btn-small">
                  <MessageCircle size={16} />
                  Enquire Now
                </button>
              </div>
            </div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{formatPrice(product.price)}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`carousel-arrow carousel-arrow--right ${!canRight ? 'carousel-arrow--hidden' : ''}`}
        onClick={() => scroll(1)}
        aria-label="Scroll right"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
};

// ─── Skeleton loader ─────────────────────────────────────────────────────────
const CarouselSkeleton = () => (
  <div className="carousel-wrapper">
    <div className="carousel-track">
      {[1, 2, 3].map((i) => (
        <div key={i} className="carousel-card product-card carousel-skeleton">
          <div className="skeleton-img" />
          <div className="product-info">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--sub" />
            <div className="skeleton-line skeleton-line--price" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const ProductCategories = () => {
  const navigate = useNavigate();

  const [bicycles, setBicycles] = useState([]);
  const [toys,     setToys]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch latest 10 of each category, ordered by createdAt desc (newest first)
        const makeQuery = (category) =>
          query(
            collection(db, 'products'),
            orderBy('createdAt', 'desc'),
            limit(10)
          );

        const [allSnap] = await Promise.all([
          getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(50)))
        ]);

        const all = allSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        // Split by category — preserve newest-first order within each
        setBicycles(all.filter((p) => p.category === 'Bicycles').slice(0, 10));
        setToys(all.filter((p) => p.category === 'Toys & Kids').slice(0, 10));
      } catch (err) {
        console.error(err);
        setError('Could not load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEnquire = (product) => {
  const lines = [
    ` *Product Enquiry*`,
    ``,
    `*Name:* ${product.name}`,
    `*Category:* ${product.category}`,
    `*Price:* ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}`,
    `*Description:* ${product.description}`,
    ``,
    `Hi! I'm interested in this product. Can you please share more details?`,
  ];
  const message = lines.join('\n');
  window.open(`https://wa.me/9020300400?text=${encodeURIComponent(message)}`, '_blank');
};

  return (
    <section id="products" className="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title-center">
            Our <span className="text-accent">Collection</span>
          </h2>
          <p className="section-subtitle-center">
            Premium bicycles and toys for the entire family
          </p>
        </div>

        {error && (
          <div className="products-error">
            <AlertTriangle size={18} /> {error}
          </div>
        )}

        <div className="products-category">
          <h3 className="category-title">🚴 Bicycles</h3>
          {loading ? <CarouselSkeleton /> : <CategoryCarousel products={bicycles} onEnquire={handleEnquire} />}
        </div>

        <div className="products-category">
          <h3 className="category-title">🧸 Toys &amp; Kids Products</h3>
          {loading ? <CarouselSkeleton /> : <CategoryCarousel products={toys} onEnquire={handleEnquire} />}
        </div>

        <div className="view-more-wrap">
          <button className="btn-primary btn-large view-more-btn" onClick={() => navigate('/products')}>
            View All Products
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
