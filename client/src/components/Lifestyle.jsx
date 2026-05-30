import React, { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';
import { getImageUrl } from '../services/api';

// Fallback images for categories that don't have images uploaded yet
import banner1 from '../assets/download (8).jpeg';
import banner2 from '../assets/Netherlands 2004 Nike Total 90 Home Shirt Reissue.jpeg';
import banner3 from '../assets/@amiri — shop new arrivals at all retail locations + online_.jpeg';
import banner4 from '../assets/Jeans.jpeg';
import banner5 from '../assets/download (10).jpeg';
import banner6 from '../assets/download (9).jpeg';

const fallbackImages = [banner1, banner2, banner3, banner4, banner5, banner6];

const Lifestyle = ({ onNavigate }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAll();
        setCategories(res.data.data || []);
      } catch {
        // Fail silently — section won't show
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const displayCategories = categories.slice(0, 6);

  if (loading) {
    return (
      <div className="w-full">
        <div className="w-full py-8 md:py-16 bg-[#f9f9f9] text-center border-t border-primary">
          <h2 className="text-[11px] md:text-xs font-label-caps tracking-[0.4em] font-bold text-[#111] uppercase">SHOP BY CATEGORY</h2>
        </div>
        <section className="w-full grid grid-cols-2 md:grid-cols-3 gap-1 bg-white overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[250px] sm:h-[300px] md:h-[700px] bg-gray-100 animate-pulse" />
          ))}
        </section>
      </div>
    );
  }

  if (displayCategories.length === 0) return null;

  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="w-full py-8 md:py-16 bg-[#f9f9f9] text-center border-t border-primary">
        <h2 className="text-[11px] md:text-xs font-label-caps tracking-[0.4em] font-bold text-[#111] uppercase">
          SHOP BY CATEGORY
        </h2>
      </div>

      {/* 6-Card Grid */}
      <section className="w-full grid grid-cols-2 md:grid-cols-3 gap-1 bg-white overflow-hidden">
        {displayCategories.map((cat, index) => {
          const imgSrc = getImageUrl(cat.image) || fallbackImages[index % fallbackImages.length];
          return (
            <div
              key={cat._id}
              onClick={() => onNavigate && onNavigate('shop', cat.name)}
              className="group relative flex items-center justify-center overflow-hidden h-[250px] sm:h-[300px] md:h-[700px] cursor-pointer bg-white"
            >
              <img
                src={imgSrc}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-1000 ease-out group-hover:opacity-75"
                onError={(e) => { e.target.src = fallbackImages[index % fallbackImages.length]; }}
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 z-10"></div>
              <button className="relative z-20 px-4 sm:px-10 py-2 sm:py-3.5 border border-white text-white text-[8px] sm:text-[10px] font-label-caps tracking-[0.2em] sm:tracking-[0.3em] font-bold transition-all duration-300 hover:bg-white hover:text-[#111] backdrop-blur-[1px] uppercase whitespace-nowrap">
                {cat.name}
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Lifestyle;
