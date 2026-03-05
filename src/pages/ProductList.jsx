import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageCircle, Search, SlidersHorizontal, ChevronDown,
  X, ChevronLeft, ChevronRight, Loader2, AlertTriangle, RefreshCw
} from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ─── Constants ────────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { label: 'Newest First',       value: 'newest'     },
  { label: 'Price: Low to High', value: 'price_asc'  },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A → Z',        value: 'name_asc'   },
  { label: 'Name: Z → A',        value: 'name_desc'  },
];

const CATEGORIES = ['All', 'Bicycles', 'Toys & Kids'];
const PAGE_SIZE   = 8;

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="product-card pl-skeleton-card">
    <div className="pl-skeleton-img" />
    <div className="product-info">
      <div className="pl-skeleton-line pl-skeleton-line--title" />
      <div className="pl-skeleton-line pl-skeleton-line--sub"   />
      <div className="pl-skeleton-line pl-skeleton-line--price" />
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const ProductList = () => {
  // ── Firebase state ──────────────────────────────────────────────────────────
  const [allProducts, setAllProducts] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [fetchError,  setFetchError]  = useState('');

  // ── Filter / sort / pagination state ───────────────────────────────────────
  const [search,           setSearch]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy,           setSortBy]           = useState('newest');
  const [sidebarOpen,      setSidebarOpen]      = useState(false);
  const [page,             setPage]             = useState(1);

  // ── Fetch all products from Firestore once ──────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    setFetchError('');
    try {
      // Fetch ordered by createdAt desc so "newest" default sort is already correct
      const q    = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setAllProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      // Fallback fetch without ordering (in case index isn't created yet)
      try {
        const snap = await getDocs(collection(db, 'products'));
        setAllProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        setFetchError('Could not load products. Check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Reset to page 1 whenever filters/sort change ────────────────────────────
  const resetPage = () => setPage(1);

  const handleCategoryChange = (cat) => { setSelectedCategory(cat); resetPage(); };
  const handleSortChange     = (val) => { setSortBy(val);           resetPage(); };
  const handleSearchChange   = (val) => { setSearch(val);           resetPage(); };
  const clearFilters         = ()    => {
    setSearch(''); setSelectedCategory('All'); setSortBy('newest'); setPage(1);
  };

  const hasActiveFilters =
    search.trim() || selectedCategory !== 'All' || sortBy !== 'newest';

  // ── Filter + sort (all in memory after one fetch) ───────────────────────────
  const filtered = useMemo(() => {
    let list = [...allProducts];

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        // Already sorted newest-first from Firestore; re-sort by createdAt just in case
        list.sort((a, b) => {
          const ta = a.createdAt?.seconds ?? (a.createdAt instanceof Date ? a.createdAt.getTime() / 1000 : 0);
          const tb = b.createdAt?.seconds ?? (b.createdAt instanceof Date ? b.createdAt.getTime() / 1000 : 0);
          return tb - ta;
        });
        break;
      case 'price_asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'name_asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name_desc':  list.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break;
    }

    return list;
  }, [allProducts, search, selectedCategory, sortBy]);

  // ── Pagination ──────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4)              return [1, 2, 3, 4, 5, '...', totalPages];
    if (page >= totalPages - 3) return [1, '...', totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages];
    return [1, '...', page-1, page, page+1, '...', totalPages];
  };

  const handleEnquire = (productName) => {
    const message = `Hi! I'm interested in ${productName}. Can you provide more details?`;
    window.open(`https://wa.me/9020300400?text=${encodeURIComponent(message)}`, '_blank');
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="pl-page">
      <Header />

      <div className="pl-hero">
        <div className="container">
          <h1 className="pl-hero-title">All <span className="text-accent">Products</span></h1>
          <p className="pl-hero-sub">Browse our full collection of bicycles and kids' products</p>
        </div>
      </div>

      <div className="container pl-layout">

        {/* Mobile filter toggle */}
        <button className="pl-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <SlidersHorizontal size={18} />
          Filters &amp; Sort
          {hasActiveFilters && <span className="pl-filter-badge" />}
        </button>

        {/* ── Sidebar ── */}
        <aside className={`pl-sidebar ${sidebarOpen ? 'pl-sidebar--open' : ''}`}>
          <div className="pl-sidebar-header">
            <span className="pl-sidebar-heading"><SlidersHorizontal size={18} /> Filters</span>
            {hasActiveFilters && (
              <button className="pl-clear-btn" onClick={clearFilters}><X size={14} /> Clear</button>
            )}
          </div>

          {/* Search */}
          <div className="pl-filter-block">
            <p className="pl-filter-label">Search</p>
            <div className="pl-search-wrap">
              <Search size={16} className="pl-search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-search-input"
              />
              {search && (
                <button className="pl-search-clear" onClick={() => handleSearchChange('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="pl-filter-block">
            <p className="pl-filter-label">Category</p>
            <div className="pl-filter-options">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`pl-filter-chip ${selectedCategory === cat ? 'pl-filter-chip--active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >{cat}</button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="pl-filter-block">
            <p className="pl-filter-label">Sort By</p>
            <div className="pl-select-wrap">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="pl-select"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pl-select-icon" />
            </div>
          </div>

          {/* Live product count in sidebar */}
          {!loading && !fetchError && (
            <div className="pl-sidebar-count">
              <span>{allProducts.length} products in store</span>
            </div>
          )}
        </aside>

        {/* ── Main content ── */}
        <main className="pl-main">

          {/* Error state */}
          {fetchError && (
            <div className="pl-fetch-error">
              <AlertTriangle size={18} />
              <span>{fetchError}</span>
              <button className="pl-retry-btn" onClick={fetchProducts}>
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          )}

          {/* Results bar */}
          {!loading && !fetchError && (
            <div className="pl-results-bar">
              <span className="pl-results-count">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                {totalPages > 1 && <> &mdash; Page {page} of {totalPages}</>}
              </span>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="product-grid pl-grid">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !fetchError && filtered.length === 0 && (
            <div className="pl-empty">
              <p className="pl-empty-title">No products found</p>
              <p className="pl-empty-sub">
                {allProducts.length === 0
                  ? 'No products have been added yet.'
                  : 'Try adjusting your search or filters.'}
              </p>
              {hasActiveFilters && (
                <button className="btn-secondary btn-medium" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Product grid */}
          {!loading && !fetchError && filtered.length > 0 && (
            <>
              <div className="product-grid pl-grid">
                {paginated.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="pl-cat-badge">{product.category}</div>
                    <div className="product-image-wrapper">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="product-image-placeholder">
                          <MessageCircle size={32} />
                        </div>
                      )}
                      <div className="product-overlay">
                        <button
                          onClick={() => handleEnquire(product.name)}
                          className="btn-primary btn-small"
                        >
                          <MessageCircle size={16} /> Enquire Now
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pl-pagination">
                  <button
                    className="pl-page-btn pl-page-nav"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {pageNumbers().map((num, i) =>
                    num === '...'
                      ? <span key={`dots-${i}`} className="pl-page-dots">…</span>
                      : <button
                          key={num}
                          className={`pl-page-btn ${page === num ? 'pl-page-btn--active' : ''}`}
                          onClick={() => setPage(num)}
                        >{num}</button>
                  )}

                  <button
                    className="pl-page-btn pl-page-nav"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductList;
