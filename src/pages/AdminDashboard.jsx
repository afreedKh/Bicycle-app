import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Pencil, Trash2, X, Check, Search,
  LayoutDashboard, Package, LogOut, ChevronDown,
  AlertTriangle, Upload, Tag, FileText,
  IndianRupee, Layers, Loader2, ImageOff
} from 'lucide-react';

// ── Single source of truth: import db from firebase.js ─────────────────────
import { db } from '../firebase';
import {
  collection, getDocs, addDoc,
  updateDoc, deleteDoc, doc,
  serverTimestamp, orderBy, query
} from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────────────────────
// Cloudinary — credentials come from .env, same as firebase.js
// ─────────────────────────────────────────────────────────────────────────────
const CLOUDINARY_CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'centro_products');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || 'Image upload failed. Check your Cloudinary config.');
  }
  const data = await res.json();
  return data.secure_url;
};

// ─────────────────────────────────────────────────────────────────────────────
// Constants & helpers
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTS_COL = 'products';

const formatPrice = (p) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

const CATEGORIES = ['Bicycles', 'Toys & Kids'];

const EMPTY_FORM = {
  name: '',
  category: 'Bicycles',
  price: '',
  description: '',
  imageUrl: '',
  imageFile: null,
  imagePreview: '',
};

// Modal open-state constants (avoids boolean/null confusion)
const MODAL_CLOSED = null;
const MODAL_ADD    = 'add';

// ─────────────────────────────────────────────────────────────────────────────
// Login Screen
// ─────────────────────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [pw, setPw]     = useState('');
  const [err, setErr]   = useState('');
  const [show, setShow] = useState(false);

  const submit = () => {
    if (pw === 'centro2024') onLogin();
    else { setErr('Incorrect password. Please try again.'); setPw(''); }
  };

  return (
    <div className="adm-login-bg">
      <div className="adm-login-card">
        <div className="adm-login-logo">
          <span className="adm-login-logotext">CENTRO</span>
          <span className="adm-login-logosub">BICYCLES &amp; TOYS</span>
        </div>
        <h2 className="adm-login-title">Admin Panel</h2>
        <p className="adm-login-hint">Enter your admin password to continue</p>
        <div className="adm-pw-wrap">
          <input
            type={show ? 'text' : 'password'}
            placeholder="Password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(''); }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className={`adm-pw-input ${err ? 'adm-pw-input--err' : ''}`}
            autoFocus
          />
          <button className="adm-pw-toggle" onClick={() => setShow(!show)}>
            {show ? '🙈' : '👁️'}
          </button>
        </div>
        {err && <div className="adm-login-err"><AlertTriangle size={14} /> {err}</div>}
        <button className="adm-login-btn" onClick={submit}>Sign In</button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Confirm Dialog
// ─────────────────────────────────────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel, loading }) => (
  <div className="adm-overlay">
    <div className="adm-dialog">
      <div className="adm-dialog-icon"><AlertTriangle size={28} /></div>
      <p className="adm-dialog-msg">{message}</p>
      <div className="adm-dialog-actions">
        <button className="adm-btn adm-btn--ghost" onClick={onCancel} disabled={loading}>Cancel</button>
        <button className="adm-btn adm-btn--danger" onClick={onConfirm} disabled={loading}>
          {loading ? <Loader2 size={15} className="adm-spin" /> : <Trash2 size={15} />}
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Image Upload Field
// ─────────────────────────────────────────────────────────────────────────────
const ImageUploadField = ({ preview, existingUrl, onFileSelect, onRemove, disabled }) => {
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) onFileSelect(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
    e.target.value = ''; // reset so same file can be re-picked after removal
  };

  const displaySrc = preview || existingUrl;

  return (
    <div className="adm-field">
      <label className="adm-label"><Upload size={14} /> Product Image</label>
      {displaySrc ? (
        <div className="adm-img-preview-wrap">
          <img src={displaySrc} alt="preview" className="adm-img-preview-full" />
          {!disabled && (
            <button className="adm-img-remove" onClick={onRemove} type="button" title="Remove image">
              <X size={16} />
            </button>
          )}
          <span className="adm-img-badge">
            {preview ? '📁 New file selected' : '🌐 Current image'}
          </span>
        </div>
      ) : (
        <div
          className={`adm-dropzone ${disabled ? 'adm-dropzone--disabled' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <Upload size={28} className="adm-dropzone-icon" />
          <p className="adm-dropzone-text">Drop image here or <span className="adm-dropzone-link">browse</span></p>
          <p className="adm-dropzone-hint">JPG, PNG, WEBP · Max 5MB · Optional</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Product Modal (Add & Edit)
// ─────────────────────────────────────────────────────────────────────────────
const ProductModal = ({ product, onSave, onClose }) => {
  const isEdit = Boolean(product);

  const [form, setForm] = useState(
    isEdit
      ? { ...EMPTY_FORM, ...product, imageFile: null, imagePreview: '' }
      : { ...EMPTY_FORM }
  );
  const [errors, setErrors]         = useState({});
  const [saving, setSaving]         = useState(false);
  const [uploadErr, setUploadErr]   = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFileSelect = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      setUploadErr('File too large. Max 5MB allowed.');
      return;
    }
    setUploadErr('');
    const reader = new FileReader();
    reader.onload = (e) => set('imagePreview', e.target.result);
    reader.readAsDataURL(file);
    set('imageFile', file);
  };

  const handleRemoveImage = () => {
    setForm((f) => ({ ...f, imageFile: null, imagePreview: '', imageUrl: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())
      e.name = 'Product name is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = 'Enter a valid price';
    if (!form.description.trim())
      e.description = 'Description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setUploadErr('');
    try {
      let imageUrl = form.imageUrl || '';
      if (form.imageFile) {
        imageUrl = await uploadToCloudinary(form.imageFile);
      }
      // Pass only plain serialisable data to parent — no File/Blob objects
      await onSave({
        ...(isEdit ? { id: product.id } : {}),
        name:        form.name.trim(),
        category:    form.category,
        price:       Number(form.price),
        description: form.description.trim(),
        imageUrl,
      });
      // Parent calls setModalState(MODAL_CLOSED) on success — no need to act here
    } catch (err) {
      setUploadErr(err.message || 'Failed to save. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="adm-overlay" onClick={saving ? undefined : onClose}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>

        <div className="adm-modal-header">
          <h3 className="adm-modal-title">{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
          <button className="adm-icon-btn" onClick={onClose} disabled={saving}><X size={20} /></button>
        </div>

        <div className="adm-modal-body">
          {/* Name */}
          <div className="adm-field">
            <label className="adm-label"><Tag size={14} /> Product Name</label>
            <input
              className={`adm-input ${errors.name ? 'adm-input--err' : ''}`}
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Mountain Bike Pro"
              disabled={saving}
            />
            {errors.name && <span className="adm-err-msg">{errors.name}</span>}
          </div>

          {/* Category + Price */}
          <div className="adm-row">
            <div className="adm-field">
              <label className="adm-label"><Layers size={14} /> Category</label>
              <div className="adm-select-wrap">
                <select className="adm-select" value={form.category} onChange={(e) => set('category', e.target.value)} disabled={saving}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="adm-select-icon" />
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-label"><IndianRupee size={14} /> Price (₹)</label>
              <input
                className={`adm-input ${errors.price ? 'adm-input--err' : ''}`}
                type="number" min="0" value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="e.g. 5000" disabled={saving}
              />
              {errors.price && <span className="adm-err-msg">{errors.price}</span>}
            </div>
          </div>

          {/* Description */}
          <div className="adm-field">
            <label className="adm-label"><FileText size={14} /> Description</label>
            <textarea
              className={`adm-textarea ${errors.description ? 'adm-input--err' : ''}`}
              rows={3} value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Short product description..."
              disabled={saving}
            />
            {errors.description && <span className="adm-err-msg">{errors.description}</span>}
          </div>

          {/* Image upload */}
          <ImageUploadField
            preview={form.imagePreview}
            existingUrl={form.imageUrl}
            onFileSelect={handleFileSelect}
            onRemove={handleRemoveImage}
            disabled={saving}
          />

          {uploadErr && (
            <div className="adm-login-err" style={{ marginTop: 0 }}>
              <AlertTriangle size={14} /> {uploadErr}
            </div>
          )}

          {saving && (
            <div className="adm-saving-status">
              <Loader2 size={16} className="adm-spin" />
              {form.imageFile ? 'Uploading image to Cloudinary…' : 'Saving to Firestore…'}
            </div>
          )}
        </div>

        <div className="adm-modal-footer">
          <button className="adm-btn adm-btn--ghost" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="adm-btn adm-btn--primary" onClick={handleSave} disabled={saving}>
            {saving
              ? <><Loader2 size={15} className="adm-spin" /> Saving…</>
              : <><Check size={16} /> {isEdit ? 'Save Changes' : 'Add Product'}</>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Admin Dashboard
// ─────────────────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [authed, setAuthed]             = useState(false);
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(false);
  const [dbError, setDbError]           = useState('');
  const [search, setSearch]             = useState('');
  const [catFilter, setCatFilter]       = useState('All');
  const [modalState, setModalState]     = useState(MODAL_CLOSED);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting]         = useState(false);
  const [toast, setToast]               = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setDbError('');
    try {
      const q    = query(collection(db, PRODUCTS_COL), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      try {
        const snap = await getDocs(collection(db, PRODUCTS_COL));
        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        setDbError('Could not connect to Firestore. Check your Firebase config in firebase.js');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (authed) fetchProducts(); }, [authed]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async (data) => {
    const payload = {
      name:        data.name,
      category:    data.category,
      price:       data.price,
      description: data.description,
      imageUrl:    data.imageUrl || '',
      updatedAt:   serverTimestamp(),
    };

    if (data.id) {
      // EDIT
      await updateDoc(doc(db, PRODUCTS_COL, data.id), payload);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === data.id
            ? { ...p, name: data.name, category: data.category, price: data.price,
                description: data.description, imageUrl: data.imageUrl || '' }
            : p
        )
      );
      showToast('Product updated successfully');
    } else {
      // ADD — use plain Date() in local state instead of serverTimestamp() sentinel
      const ref = await addDoc(collection(db, PRODUCTS_COL), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      setProducts((prev) => [
        {
          id:          ref.id,
          name:        data.name,
          category:    data.category,
          price:       data.price,
          description: data.description,
          imageUrl:    data.imageUrl || '',
          createdAt:   new Date(),
          updatedAt:   new Date(),
        },
        ...prev,
      ]);
      showToast('Product added successfully');
    }

    setModalState(MODAL_CLOSED);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, PRODUCTS_COL, deleteTarget.id));
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showToast('Product deleted', 'danger');
    } catch {
      showToast('Failed to delete product', 'danger');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filtered = products.filter((p) => {
    const matchCat    = catFilter === 'All' || p.category === catFilter;
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const stats = {
    total:    products.length,
    bicycles: products.filter((p) => p.category === 'Bicycles').length,
    toys:     products.filter((p) => p.category === 'Toys & Kids').length,
  };

  const isModalOpen = modalState !== MODAL_CLOSED;
  const editProduct = modalState === MODAL_ADD ? null : modalState;

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="adm-root">

      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <span className="adm-logo-text">CENTRO</span>
          <span className="adm-logo-sub">Admin Panel</span>
        </div>
        <nav className="adm-nav">
          <div className="adm-nav-item adm-nav-item--active"><LayoutDashboard size={18} /> Dashboard</div>
          <div className="adm-nav-item adm-nav-item--active"><Package size={18} /> Products</div>
        </nav>
        <button className="adm-logout" onClick={() => setAuthed(false)}>
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* Main */}
      <div className="adm-main">
        <div className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Products</h1>
            <p className="adm-page-sub">Manage your product catalogue · stored in Firestore</p>
          </div>
          <button className="adm-btn adm-btn--primary" onClick={() => setModalState(MODAL_ADD)}>
            <Plus size={18} /> Add Product
          </button>
        </div>

        {dbError && (
          <div className="adm-banner adm-banner--err">
            <AlertTriangle size={16} /> {dbError}
            <button className="adm-banner-retry" onClick={fetchProducts}>Retry</button>
          </div>
        )}

        <div className="adm-stats">
          {[
            { label: 'Total Products', value: stats.total,    color: 'accent' },
            { label: 'Bicycles',       value: stats.bicycles, color: 'blue'   },
            { label: 'Toys & Kids',    value: stats.toys,     color: 'purple' },
          ].map((s) => (
            <div key={s.label} className={`adm-stat-card adm-stat-card--${s.color}`}>
              <span className="adm-stat-value">
                {loading ? <Loader2 size={22} className="adm-spin" /> : s.value}
              </span>
              <span className="adm-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="adm-filters">
          <div className="adm-search-wrap">
            <Search size={16} className="adm-search-icon" />
            <input
              className="adm-search-input"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="adm-search-clear" onClick={() => setSearch('')}><X size={14} /></button>}
          </div>
          <div className="adm-cat-tabs">
            {['All', 'Bicycles', 'Toys & Kids'].map((c) => (
              <button key={c}
                className={`adm-cat-tab ${catFilter === c ? 'adm-cat-tab--active' : ''}`}
                onClick={() => setCatFilter(c)}
              >{c}</button>
            ))}
          </div>
        </div>

        <div className="adm-table-wrap">
          {loading ? (
            <div className="adm-table-loading">
              <Loader2 size={32} className="adm-spin" />
              <p>Loading products from Firestore…</p>
            </div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>#</th><th>Product</th><th>Category</th>
                  <th>Price</th><th>Description</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="adm-table-empty">
                    {products.length === 0
                      ? 'No products yet. Click "Add Product" to get started.'
                      : 'No products match your search.'}
                  </td></tr>
                ) : (
                  filtered.map((p, i) => (
                    <tr key={p.id} className="adm-table-row">
                      <td className="adm-td-num">{i + 1}</td>
                      <td className="adm-td-name">
                        {p.imageUrl
                          ? <img src={p.imageUrl} alt={p.name} className="adm-thumb"
                              onError={(e) => { e.target.style.display = 'none'; }} />
                          : <div className="adm-thumb-placeholder"><ImageOff size={15} /></div>
                        }
                        <span>{p.name}</span>
                      </td>
                      <td>
                        <span className={`adm-badge adm-badge--${p.category === 'Bicycles' ? 'blue' : 'purple'}`}>
                          {p.category}
                        </span>
                      </td>
                      <td className="adm-td-price">{formatPrice(p.price)}</td>
                      <td className="adm-td-desc">{p.description}</td>
                      <td>
                        <div className="adm-actions">
                          <button className="adm-icon-btn adm-icon-btn--edit"
                            onClick={() => setModalState(p)} title="Edit">
                            <Pencil size={15} />
                          </button>
                          <button className="adm-icon-btn adm-icon-btn--del"
                            onClick={() => setDeleteTarget(p)} title="Delete">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <p className="adm-footer-note">
          {!loading && <>Showing {filtered.length} of {products.length} products &nbsp;·&nbsp;</>}
          Centro Admin v2.1 &nbsp;·&nbsp; Firebase Firestore + Cloudinary
        </p>
      </div>

      {isModalOpen && (
        <ProductModal
          product={editProduct}
          onSave={handleSave}
          onClose={() => setModalState(MODAL_CLOSED)}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {toast && (
        <div className={`adm-toast adm-toast--${toast.type}`}>
          {toast.type === 'success' ? <Check size={16} /> : <Trash2 size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
