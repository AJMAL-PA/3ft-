import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { attributeService } from '../../services/attributeService';
import { getImageUrl } from '../../services/api';

const emptyForm = {
  title: '', sku: '', price: '', category: '', description: '',
  isFeatured: false, inStock: true,
  productType: 'simple',
  sizes: ['S', 'M', 'L', 'XL'],
  attributes: [],
  imagesList: [], // { id, url, file, isExisting }
};

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributesList, setAttributesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, attrRes] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
        attributeService.getAll()
      ]);
      setProducts(prodRes.data.data || []);
      setCategories(catRes.data.data || []);
      setAttributesList(attrRes.data.data || []);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || p.category?._id === filterCat;
    return matchSearch && matchCat;
  });

  const openAdd = () => { setEditTarget(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (p) => {
    setEditTarget(p);

    const existingImages = p.images && p.images.length > 0
      ? p.images.map((url, index) => ({ id: `existing-${index}`, url: getImageUrl(url), file: null, isExisting: true }))
      : p.image
        ? [{ id: 'existing-0', url: getImageUrl(p.image), file: null, isExisting: true }]
        : [];

    setForm({
      title: p.title, sku: p.sku, price: p.price, category: p.category?._id || '',
      description: p.description || '', isFeatured: p.isFeatured, inStock: p.inStock,
      productType: p.productType || 'simple',
      sizes: p.sizes || ['S', 'M', 'L', 'XL'],
      attributes: p.attributes || [],
      imagesList: existingImages,
    });
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); setForm(emptyForm); };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = files.map((file, idx) => ({
      id: `new-${Date.now()}-${idx}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file,
      isExisting: false,
    }));

    setForm(prev => ({
      ...prev,
      imagesList: [...prev.imagesList, ...newImages],
    }));

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const removeImage = (idToRemove) => {
    setForm(prev => ({
      ...prev,
      imagesList: prev.imagesList.filter(img => img.id !== idToRemove),
    }));
  };

  const handleToggleAttributeValue = (attrName, value) => {
    const currentAttrs = [...(form.attributes || [])];
    const existingIndex = currentAttrs.findIndex((a) => a.name === attrName);

    if (existingIndex > -1) {
      const existingAttr = currentAttrs[existingIndex];
      const isSelected = existingAttr.values.includes(value);
      
      let nextValues;
      if (isSelected) {
        nextValues = existingAttr.values.filter((v) => v !== value);
      } else {
        nextValues = [...existingAttr.values, value];
      }

      if (nextValues.length === 0) {
        currentAttrs.splice(existingIndex, 1);
      } else {
        currentAttrs[existingIndex] = { ...existingAttr, values: nextValues };
      }
    } else {
      currentAttrs.push({ name: attrName, values: [value] });
    }

    setForm({ ...form, attributes: currentAttrs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.sku || !form.price || !form.category) {
      toast.error('Title, SKU, price and category are required'); return;
    }
    if (!form.imagesList || form.imagesList.length === 0) {
      toast.error('At least one product image is required'); return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('sku', form.sku.trim());
      fd.append('price', form.price);
      fd.append('category', form.category);
      fd.append('description', form.description);
      fd.append('isFeatured', form.isFeatured);
      fd.append('inStock', form.inStock);
      fd.append('productType', form.productType);
      fd.append('sizes', JSON.stringify(form.sizes || []));
      fd.append('attributes', JSON.stringify(form.attributes || []));

      const existingUrls = form.imagesList
        .filter(img => img.isExisting)
        .map(img => img.url);
      fd.append('existingImages', JSON.stringify(existingUrls));

      form.imagesList
        .filter(img => !img.isExisting && img.file)
        .forEach(img => {
          fd.append('images', img.file);
        });

      if (editTarget) {
        await productService.update(editTarget._id, fd);
        toast.success('Product updated!');
      } else {
        await productService.create(fd);
        toast.success('Product created!');
      }
      closeModal();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try {
      await productService.delete(p._id);
      toast.success('Product deleted');
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Delete failed'); }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#9a2a2a] transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} />
          </div>
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#9a2a2a] bg-white text-gray-600 transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0b0b0b] hover:bg-[#9a2a2a] text-white px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Product
        </button>
      </div>

      <p className="text-[10px] text-gray-400 uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        Showing {filtered.length} of {products.length} products
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48"><div className="w-6 h-6 border-2 border-[#9a2a2a]/30 border-t-[#9a2a2a] rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>{products.length === 0 ? 'No products yet.' : 'No products match your search.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-50">
                  {['Product', 'SKU', 'Category', 'Type', 'Price', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={getImageUrl(p.image)} alt={p.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/44'; }} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#111] uppercase tracking-wide leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{p.title}</p>
                          {p.isFeatured && <span className="text-[9px] text-[#9a2a2a] font-bold uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>★ Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs font-mono text-gray-400">/{p.sku}</span></td>
                    <td className="px-5 py-4"><span className="text-xs text-gray-600 capitalize" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>{p.category?.name || '—'}</span></td>
                    <td className="px-5 py-4">
                      <span 
                        className={`text-[9px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border ${
                          p.productType === 'variable' 
                            ? 'bg-purple-50 text-purple-600 border-purple-100' 
                            : 'bg-gray-50 text-gray-500 border-gray-100'
                        }`} 
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {p.productType || 'simple'}
                      </span>
                    </td>
                    <td className="px-5 py-4"><span className="font-bold text-sm text-[#111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>₹{p.price?.toLocaleString()}</span></td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${p.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {p.inStock ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#111] transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={() => handleDelete(p)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-[0.2em] text-[#111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {editTarget ? 'Edit Product' : 'Add Product'}
              </h3>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Product Title *</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Vintage Archive Jacket" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9a2a2a] transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} />
                </div>
                {/* SKU */}
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>SKU *</label>
                  <input type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="e.g. AS1234" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9a2a2a] transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} />
                </div>
                {/* Price */}
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Price (₹) *</label>
                  <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. 15000" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9a2a2a] transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} />
                </div>
                {/* Category */}
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9a2a2a] bg-white transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                {/* Product Type */}
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Product Type *</label>
                  <select value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9a2a2a] bg-white transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                    <option value="simple">Simple Product (No size selection)</option>
                    <option value="variable">Variable Product (With size selection)</option>
                  </select>
                </div>
                {/* Product Attributes List */}
                {form.productType === 'variable' && (
                  <div className="sm:col-span-2 space-y-4 border-t border-gray-100 pt-4 mt-2">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-[#9a2a2a] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      Product Attributes
                    </h4>
                    
                    {attributesList.length === 0 ? (
                      <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-xs text-gray-400" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                          No attributes defined. Go to <a href="/admin/attributes" className="text-[#9a2a2a] underline font-semibold">Attributes Manager</a> to create some (e.g. Size, Color).
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {attributesList.map((attr) => {
                          const productAttr = form.attributes?.find((a) => a.name === attr.name);
                          const selectedValues = productAttr?.values || [];

                          return (
                            <div key={attr._id} className="space-y-2">
                              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Available {attr.name}
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {attr.values.map((val) => {
                                  const isSelected = selectedValues.includes(val);
                                  return (
                                    <button
                                      type="button"
                                      key={val}
                                      onClick={() => handleToggleAttributeValue(attr.name, val)}
                                      className={`h-10 px-4 border flex items-center justify-center font-label-caps text-xs tracking-wider transition-all duration-200 font-bold cursor-pointer rounded-xl ${
                                        isSelected
                                          ? 'border-[#9a2a2a] text-[#9a2a2a] bg-[#9a2a2a]/5 font-black scale-105'
                                          : 'border-gray-200 text-gray-400 bg-white hover:border-gray-300'
                                      }`}
                                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                    >
                                      {val}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
                {/* Flags */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 accent-[#9a2a2a] rounded" />
                    <span className="text-xs text-gray-600 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="w-4 h-4 accent-[#9a2a2a] rounded" />
                    <span className="text-xs text-gray-600 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>In Stock</span>
                  </label>
                </div>
                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Product description..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9a2a2a] resize-none transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }} />
                </div>
                {/* Images */}
                <div className="sm:col-span-2 space-y-3">
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Product Images (First image is default card image) *
                  </label>
                  
                  {/* Grid of uploaded images */}
                  {form.imagesList && form.imagesList.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {form.imagesList.map((img, idx) => (
                        <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group shadow-sm bg-gray-50">
                          <img src={getImageUrl(img.url)} alt="preview" className="w-full h-full object-cover" />
                          
                          {/* Badge for default card image */}
                          {idx === 0 && (
                            <div className="absolute top-1 left-1 bg-[#9a2a2a] text-white text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded shadow">
                              DEFAULT
                            </div>
                          )}
                          
                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => removeImage(img.id)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/75 hover:bg-[#9a2a2a] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Trigger Area */}
                  <div 
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#9a2a2a]/40 transition-colors bg-gray-50/50 flex flex-col items-center justify-center gap-2 text-gray-400"
                    onClick={() => fileRef.current?.click()}
                  >
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      Click to upload images
                    </p>
                    <p className="text-[10px] text-gray-400/80" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                      Select one or more images (JPEG, PNG, WebP up to 5MB)
                    </p>
                    <input 
                      ref={fileRef} 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleImagesChange} 
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold tracking-widest uppercase text-gray-500 hover:bg-gray-50 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl bg-[#0b0b0b] hover:bg-[#9a2a2a] text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {submitting && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {editTarget ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
