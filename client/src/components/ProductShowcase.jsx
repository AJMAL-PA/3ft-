import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import ProductCard from './ProductCard';

const ProductShowcase = ({ onNavigate }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, catRes, allRes] = await Promise.all([
          productService.getFeatured(),
          categoryService.getAll(),
          productService.getAll(),
        ]);

        const cats = catRes.data.data || [];
        const allProds = allRes.data.data || [];
        const byCategory = {};

        cats.forEach((cat) => {
          byCategory[cat._id] = allProds
            .filter((p) => p.category?._id === cat._id || p.category === cat._id)
            .slice(0, 4);
        });

        setFeaturedProducts(featuredRes.data.data || []);
        setCategories(cats);
        setProductsByCategory(byCategory);
      } catch (err) {
        console.error('ProductShowcase fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#f9f9f9] text-[#111] py-12 md:py-24 px-4 md:px-12 lg:px-24">
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-[#9a2a2a]/30 border-t-[#9a2a2a] rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f9f9f9] text-[#111] py-12 md:py-24 px-4 md:px-12 lg:px-24 font-body-base overflow-hidden">

      {/* Featured / New Arrivals */}
      {featuredProducts.length > 0 && (
        <div className="category-section mb-16 md:mb-32">
          <div className="flex items-center justify-between mb-8 md:mb-10 border-b border-gray-200 pb-4">
            <h3 className="font-headline-lg text-2xl md:text-3xl tracking-wider text-[#111] uppercase font-bold">NEW ARRIVALS</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onClick={(p) => onNavigate('product-detail', p)}
              />
            ))}
          </div>

          <div className="flex justify-center md:justify-end mt-2 md:mt-6">
            <button
              onClick={() => onNavigate('shop')}
              className="border border-black px-3 md:px-5 py-2 bg-transparent text-black font-label-caps text-[10px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-300 font-bold"
            >
              VIEW ALL
            </button>
          </div>
        </div>
      )}

      {/* Category sections */}
      {categories.map((cat) => {
        const catProducts = productsByCategory[cat._id] || [];
        if (catProducts.length === 0) return null;
        return (
          <div key={cat._id} className="category-section mb-16 md:mb-32 last:mb-0">
            <div className="flex items-center justify-between mb-8 md:mb-10 border-b border-gray-200 pb-4">
              <h3 className="font-headline-lg text-2xl md:text-3xl tracking-wider text-[#111] uppercase font-bold">{cat.name}</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {catProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onClick={(p) => onNavigate && onNavigate('product-detail', p)}
                />
              ))}
            </div>

            <div className="flex justify-center md:justify-end mt-2 md:mt-6">
              <button
                onClick={() => onNavigate && onNavigate('shop', cat.name)}
                className="border border-black px-3 md:px-5 py-2 bg-transparent text-black font-label-caps text-[10px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-300 font-bold"
              >
                VIEW ALL
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProductShowcase;
