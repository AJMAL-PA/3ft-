import React, { useState, useEffect, useMemo } from 'react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import ProductCard from './ProductCard';

const Shop = ({ selectedCategory = 'All', setSelectedCategory = () => {}, onNavigate, searchQuery = '', setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Mobile drawer and accordion states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [sortExpanded, setSortExpanded] = useState(false);

  // Helper to get products matching search query for count calculations
  const searchedProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, searchQuery]);

  // Fetch products and categories from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [prodRes, catRes] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
        ]);
        setProducts(prodRes.data.data || []);
        setCategories(catRes.data.data || []);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error('Shop fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort logic (works with API data)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category?.name === selectedCategory || p.category === selectedCategory
      );
    }

    // Price filter (price is now a number from API)
    if (priceRange !== 'All') {
      result = result.filter((p) => {
        const price = typeof p.price === 'number' ? p.price : parseInt(String(p.price).replace(/[^0-9]/g, ''), 10) || 0;
        if (priceRange === 'under10') return price < 10000;
        if (priceRange === '10to20') return price >= 10000 && price <= 20000;
        if (priceRange === 'over20') return price > 20000;
        return true;
      });
    }

    // Sort
    if (sortBy === 'priceLow') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceHigh') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'alphabetical') result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [products, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange('All');
    setSortBy('featured');
    if (setSearchQuery) setSearchQuery('');
  };

  if (loading) {
    return (
      <section className="w-full bg-[#f9f9f9] text-[#111] py-32 px-6 md:px-12 lg:px-24 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#9a2a2a]/30 border-t-[#9a2a2a] rounded-full animate-spin" />
          <p className="font-label-caps text-[10px] tracking-[0.3em] text-gray-400 uppercase">Loading Collection...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-[#f9f9f9] text-[#111] py-32 px-6 md:px-12 lg:px-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-headline-lg text-2xl text-[#111] mb-4 uppercase">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-[#111] text-white px-8 py-3 font-label-caps text-xs tracking-widest uppercase hover:bg-[#9a2a2a] transition-colors">
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f9f9f9] text-[#111] py-20 md:py-32 px-6 md:px-12 lg:px-24 min-h-screen font-body-base">

      {/* Top Shop Title */}
      <div className="border-b border-gray-200 pb-8 mb-16 flex flex-col items-center justify-center text-center gap-4">
        <div>
          <h1 className="font-headline-lg text-4xl md:text-5xl font-bold uppercase tracking-wider text-[#111]">
            {searchQuery ? `Search Results` : 'Collection Archive'}
          </h1>
          <p className="text-gray-500 font-label-caps text-[10px] tracking-[0.3em] mt-2 uppercase">
            {searchQuery ? `Matches for "${searchQuery}"` : 'Browse entire catalog'}
          </p>
        </div>
        <div className="text-gray-400 font-mono text-[11px]">
          /{filteredProducts.length} OF {products.length} ITEMS
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-center mb-10">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="border border-[#111] bg-white text-[#111] py-3.5 px-12 font-label-caps text-[10px] tracking-[0.25em] font-bold hover:bg-[#111] hover:text-white transition-all duration-300 uppercase flex items-center gap-3 shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Filter By
        </button>
      </div>

      {/* Main Layout Split */}
      <div className="flex flex-col md:flex-row gap-12">

        {/* Left Filtering Sidebar (Desktop Only) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-10">

            {/* Category Filter */}
            <div>
              <h3 className="font-label-caps text-xs tracking-[0.25em] font-bold text-[#111] uppercase mb-6 border-b border-black/5 pb-2">
                Categories
              </h3>
              <ul className="space-y-3 text-xs font-body-base tracking-wide">
                <li>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`text-left hover:text-[#9a2a2a] transition-colors duration-200 uppercase font-semibold tracking-wider ${selectedCategory === 'All' ? 'text-[#9a2a2a] font-bold' : 'text-gray-600'}`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat._id || cat}>
                    <button
                      onClick={() => setSelectedCategory(cat.name || cat)}
                      className={`text-left hover:text-[#9a2a2a] transition-colors duration-200 uppercase font-semibold tracking-wider ${selectedCategory === (cat.name || cat) ? 'text-[#9a2a2a] font-bold' : 'text-gray-600'}`}
                    >
                      {cat.name || cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-label-caps text-xs tracking-[0.25em] font-bold text-[#111] uppercase mb-6 border-b border-black/5 pb-2">
                Price
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'All Prices', value: 'All' },
                  { label: 'Under ₹10,000', value: 'under10' },
                  { label: '₹10,000 – ₹20,000', value: '10to20' },
                  { label: 'Over ₹20,000', value: 'over20' },
                ].map((range) => (
                  <label key={range.value} className="flex items-center gap-3 cursor-pointer group text-xs">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === range.value}
                      onChange={() => setPriceRange(range.value)}
                      className="w-3.5 h-3.5 border border-gray-300 text-[#111] focus:ring-[#9a2a2a] cursor-pointer accent-[#111]"
                    />
                    <span className={`uppercase tracking-wider font-semibold group-hover:text-[#9a2a2a] transition-colors ${priceRange === range.value ? 'text-[#111]' : 'text-gray-500'}`}>
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sorting */}
            <div>
              <h3 className="font-label-caps text-xs tracking-[0.25em] font-bold text-[#111] uppercase mb-6 border-b border-black/5 pb-2">
                Sort By
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 text-[#111] text-xs py-2 font-semibold uppercase tracking-wider focus:outline-none focus:border-[#9a2a2a] appearance-none rounded-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg fill=\'none\' stroke=\'currentColor\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em', backgroundRepeat: 'no-repeat' }}
              >
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="alphabetical">A-Z Order</option>
              </select>
            </div>

            {/* Reset */}
            {(selectedCategory !== 'All' || priceRange !== 'All' || sortBy !== 'featured') && (
              <button
                onClick={clearFilters}
                className="w-full border border-[#111] py-3 font-label-caps text-[10px] tracking-[0.2em] font-bold hover:bg-[#111] hover:text-white transition-all duration-300 uppercase"
              >
                Reset Filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product._id || product.id} 
                  product={product} 
                  onClick={(p) => onNavigate && onNavigate('product-detail', p)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-[400px] flex flex-col items-center justify-center border border-dashed border-gray-300 text-center p-12 bg-white/50">
              <p className="font-headline-lg text-xl tracking-wider font-bold uppercase text-[#111] mb-2">No matches found</p>
              <p className="text-gray-500 text-xs font-body-base uppercase tracking-widest">Try clearing your filters or selecting a different category.</p>
              <button onClick={clearFilters} className="mt-6 bg-[#111] text-white px-8 py-3 text-[10px] font-label-caps tracking-[0.2em] font-bold hover:bg-[#9a2a2a] transition-all duration-300 uppercase">
                Reset Selection
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Slide-out Sidebar */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop overlay */}
        <div 
          onClick={() => setIsDrawerOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        />

        {/* Drawer panel */}
        <div className={`absolute top-0 left-0 h-full w-[85vw] max-w-[360px] bg-[#f9f9f9] text-[#111] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
            <span className="font-label-caps text-xs tracking-[0.25em] font-bold text-[#111] uppercase">Filter By</span>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-500 hover:text-black p-1 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer content (Scrollable) */}
          <div className="flex-grow overflow-y-auto px-6 py-6 space-y-6">
            
            {/* CATEGORY Accordion */}
            <div className="border-b border-gray-200 pb-4">
              <button 
                onClick={() => setCategoryExpanded(!categoryExpanded)}
                className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
              >
                <span className="font-label-caps text-xs tracking-[0.2em] font-bold text-[#111] uppercase">Category</span>
                <span className="text-gray-500">
                  {categoryExpanded ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </span>
              </button>
              
              <div className={`mt-3 space-y-3 overflow-hidden transition-all duration-300 ${categoryExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {/* All products option */}
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 ${selectedCategory === 'All' ? 'border-[#111] bg-[#111]' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                      {selectedCategory === 'All' && (
                        <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                        </svg>
                      )}
                    </div>
                    <span className={`font-label-caps text-[11px] tracking-wider uppercase font-semibold transition-colors duration-200 ${selectedCategory === 'All' ? 'text-[#9a2a2a] font-bold' : 'text-gray-600 group-hover:text-black'}`}>
                      All Products
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-gray-400">
                    ({searchedProducts.length})
                  </span>
                </button>

                {categories.map((cat) => {
                  const catName = cat.name || cat;
                  const count = searchedProducts.filter(
                    (p) => p.category?.name === catName || p.category === catName
                  ).length;
                  const isSelected = selectedCategory === catName;
                  return (
                    <button
                      key={cat._id || cat}
                      onClick={() => setSelectedCategory(catName)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 ${isSelected ? 'border-[#111] bg-[#111]' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
                              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                            </svg>
                          )}
                        </div>
                        <span className={`font-label-caps text-[11px] tracking-wider uppercase font-semibold transition-colors duration-200 ${isSelected ? 'text-[#9a2a2a] font-bold' : 'text-gray-600 group-hover:text-black'}`}>
                          {catName}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-gray-400">
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRICE Accordion */}
            <div className="border-b border-gray-200 pb-4">
              <button 
                onClick={() => setPriceExpanded(!priceExpanded)}
                className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
              >
                <span className="font-label-caps text-xs tracking-[0.2em] font-bold text-[#111] uppercase">Price</span>
                <span className="text-gray-500">
                  {priceExpanded ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </span>
              </button>

              <div className={`mt-3 space-y-3 overflow-hidden transition-all duration-300 ${priceExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {[
                  { label: 'All Prices', value: 'All', count: searchedProducts.length },
                  { 
                    label: 'Under ₹10,000', 
                    value: 'under10',
                    count: searchedProducts.filter((p) => {
                      const price = typeof p.price === 'number' ? p.price : parseInt(String(p.price).replace(/[^0-9]/g, ''), 10) || 0;
                      return price < 10000;
                    }).length
                  },
                  { 
                    label: '₹10,000 – ₹20,000', 
                    value: '10to20',
                    count: searchedProducts.filter((p) => {
                      const price = typeof p.price === 'number' ? p.price : parseInt(String(p.price).replace(/[^0-9]/g, ''), 10) || 0;
                      return price >= 10000 && price <= 20000;
                    }).length
                  },
                  { 
                    label: 'Over ₹20,000', 
                    value: 'over20',
                    count: searchedProducts.filter((p) => {
                      const price = typeof p.price === 'number' ? p.price : parseInt(String(p.price).replace(/[^0-9]/g, ''), 10) || 0;
                      return price > 20000;
                    }).length
                  },
                ].map((range) => {
                  const isSelected = priceRange === range.value;
                  return (
                    <button
                      key={range.value}
                      onClick={() => setPriceRange(range.value)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 ${isSelected ? 'border-[#111] bg-[#111]' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
                              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                            </svg>
                          )}
                        </div>
                        <span className={`font-label-caps text-[11px] tracking-wider uppercase font-semibold transition-colors duration-200 ${isSelected ? 'text-[#111] font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                          {range.label}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-gray-400">
                        ({range.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SORT BY Accordion */}
            <div className="border-b border-gray-200 pb-4">
              <button 
                onClick={() => setSortExpanded(!sortExpanded)}
                className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
              >
                <span className="font-label-caps text-xs tracking-[0.2em] font-bold text-[#111] uppercase">Sort By</span>
                <span className="text-gray-500">
                  {sortExpanded ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </span>
              </button>

              <div className={`mt-3 space-y-3 overflow-hidden transition-all duration-300 ${sortExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {[
                  { label: 'Featured', value: 'featured' },
                  { label: 'Price: Low to High', value: 'priceLow' },
                  { label: 'Price: High to Low', value: 'priceHigh' },
                  { label: 'A-Z Order', value: 'alphabetical' },
                ].map((option) => {
                  const isSelected = sortBy === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className="w-full flex items-center gap-3 text-left group"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 ${isSelected ? 'border-[#111] bg-[#111]' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                        {isSelected && (
                          <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                          </svg>
                        )}
                      </div>
                      <span className={`font-label-caps text-[11px] tracking-wider uppercase font-semibold transition-colors duration-200 ${isSelected ? 'text-[#111] font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-gray-200 bg-white space-y-3">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full bg-[#111] text-white py-4 font-label-caps text-xs tracking-[0.2em] font-bold hover:bg-[#9a2a2a] transition-all duration-300 uppercase"
            >
              View {filteredProducts.length} Products
            </button>
            {(selectedCategory !== 'All' || priceRange !== 'All' || sortBy !== 'featured') && (
              <button
                onClick={() => {
                  clearFilters();
                }}
                className="w-full border border-gray-300 py-3 font-label-caps text-[10px] tracking-[0.2em] font-bold text-gray-500 hover:text-black hover:border-black transition-all duration-300 uppercase"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
