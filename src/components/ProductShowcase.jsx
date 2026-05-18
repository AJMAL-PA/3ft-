import React from 'react';
import { categories, products } from '../data/products';
import ProductCard from './ProductCard';

const ProductShowcase = ({ onNavigate }) => {
  const featuredIds = [10, 6, 13, 21];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));

  return (
    <section className="w-full bg-[#f9f9f9] text-[#111] py-24 px-6 md:px-12 lg:px-24 font-body-base overflow-hidden">
      


      {/* Featured Products Section */}
      <div className="category-section mb-32">
        <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
          <h3 className="font-headline-lg text-2xl md:text-3xl tracking-wider text-[#111] uppercase font-bold">NEW ARRIVALS</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* View All Footer Link */}
        <div className="flex justify-end mt-8">
          <button 
            onClick={() => onNavigate('shop')}
            className="group flex items-center gap-2 text-[10px] font-label-caps tracking-[0.3em] text-[#111] hover:text-[#9a2a2a] transition-colors duration-300 uppercase font-bold"
          >
            VIEW ALL 
            <svg className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sections per category */}
      {categories.map((cat) => {
        const catProducts = products.filter(p => p.category === cat).slice(0, 4);
        return (
          <div key={cat} className="category-section mb-32 last:mb-0">
            <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
              <h3 className="font-headline-lg text-2xl md:text-3xl tracking-wider text-[#111] uppercase font-bold">{cat}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {catProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Footer Link */}
            <div className="flex justify-end mt-8">
              <button 
                onClick={() => onNavigate && onNavigate('shop', cat)}
                className="group flex items-center gap-2 text-[10px] font-label-caps tracking-[0.3em] text-[#111] hover:text-[#9a2a2a] transition-colors duration-300 uppercase font-bold"
              >
                VIEW ALL 
                <svg className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}

    </section>
  );
};

export default ProductShowcase;
