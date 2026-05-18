import React, { useState, useMemo } from 'react';
import { categories, products } from '../data/products';
import ProductCard from './ProductCard';

const Shop = ({ selectedCategory = 'All', setSelectedCategory = () => {} }) => {
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Parse price numerical values for sorting and filtering
  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price Filter
    if (priceRange !== 'All') {
      result = result.filter((p) => {
        const priceVal = parsePrice(p.price);
        if (priceRange === 'under10') return priceVal < 10000;
        if (priceRange === '10to20') return priceVal >= 10000 && priceVal <= 20000;
        if (priceRange === 'over20') return priceVal > 20000;
        return true;
      });
    }

    // Sort
    if (sortBy === 'priceLow') {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange('All');
    setSortBy('featured');
  };

  return (
    <section className="w-full bg-[#f9f9f9] text-[#111] py-20 md:py-32 px-6 md:px-12 lg:px-24 min-h-screen font-body-base">
      
      {/* Top Shop Title */}
      <div className="border-b border-gray-200 pb-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="font-headline-lg text-4xl md:text-5xl font-bold uppercase tracking-wider text-[#111]">
            Collection Archive
          </h1>
          <p className="text-gray-500 font-label-caps text-[10px] tracking-[0.3em] mt-2 uppercase">
            Browse entire catalog
          </p>
        </div>
        
        <div className="text-gray-400 font-mono text-[11px]">
          /{filteredProducts.length} OF {products.length} ITEMS
        </div>
      </div>

      {/* Main Layout Split */}
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Left Filtering Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
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
                  <li key={cat}>
                    <button 
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left hover:text-[#9a2a2a] transition-colors duration-200 uppercase font-semibold tracking-wider ${selectedCategory === cat ? 'text-[#9a2a2a] font-bold' : 'text-gray-600'}`}
                    >
                      {cat}
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
                  { label: 'Under ¥10,000', value: 'under10' },
                  { label: '¥10,000 – ¥20,000', value: '10to20' },
                  { label: 'Over ¥20,000', value: 'over20' },
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

            {/* Sorting Controls */}
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

            {/* Reset Action */}
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

        {/* Right 3-Column Product Grid */}
        <main className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="w-full h-[400px] flex flex-col items-center justify-center border border-dashed border-gray-300 text-center p-12 bg-white/50">
              <p className="font-headline-lg text-xl tracking-wider font-bold uppercase text-[#111] mb-2">No matches found</p>
              <p className="text-gray-500 text-xs font-body-base uppercase tracking-widest">Try clearing your filters or selecting a different category.</p>
              <button 
                onClick={clearFilters}
                className="mt-6 bg-[#111] text-white px-8 py-3 text-[10px] font-label-caps tracking-[0.2em] font-bold hover:bg-[#9a2a2a] transition-all duration-300 uppercase"
              >
                Reset Selection
              </button>
            </div>
          )}
        </main>

      </div>
    </section>
  );
};

export default Shop;
