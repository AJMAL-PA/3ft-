import React from 'react';
import banner1 from '../assets/download (8).jpeg';
import banner2 from '../assets/Netherlands 2004 Nike Total 90 Home Shirt Reissue.jpeg';
import banner3 from '../assets/@amiri — shop new arrivals at all retail locations + online_.jpeg';
import banner4 from '../assets/Jeans.jpeg';
import banner5 from '../assets/download (10).jpeg';
import banner6 from '../assets/download (9).jpeg';

const Lifestyle = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Small Editorial Section Title */}
      <div className="w-full py-16 bg-[#f9f9f9] text-center border-t border-primary">
        <h2 className="text-[11px] md:text-xs font-label-caps tracking-[0.4em] font-bold text-[#111] uppercase">
          SHOP BY CATEGORY
        </h2>
      </div>

      {/* Consolidated 6-Card Grid with White Gaps */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-1 bg-white overflow-hidden">
        
        {/* Banner 1 - T-Shirts */}
        <div 
          onClick={() => onNavigate && onNavigate('shop', 'T-Shirts')}
          className="group relative flex items-center justify-center overflow-hidden h-[500px] md:h-[700px] cursor-pointer bg-white"
        >
          <img 
            src={banner1} 
            alt="Editorial Feature 01" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-1000 ease-out group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 z-10"></div>
          <button className="relative z-20 px-10 py-3.5 border border-white text-white text-[10px] font-label-caps tracking-[0.3em] font-bold transition-all duration-300 hover:bg-white hover:text-[#111] backdrop-blur-[1px] uppercase">
            T-Shirts
          </button>
        </div>

        {/* Banner 2 - Jerseys */}
        <div 
          onClick={() => onNavigate && onNavigate('shop', 'Jerseys')}
          className="group relative flex items-center justify-center overflow-hidden h-[500px] md:h-[700px] cursor-pointer bg-white"
        >
          <img 
            src={banner2} 
            alt="Editorial Feature 02" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-1000 ease-out group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 z-10"></div>
          <button className="relative z-20 px-10 py-3.5 border border-white text-white text-[10px] font-label-caps tracking-[0.3em] font-bold transition-all duration-300 hover:bg-white hover:text-[#111] backdrop-blur-[1px] uppercase">
            Jerseys
          </button>
        </div>

        {/* Banner 3 - Jackets */}
        <div 
          onClick={() => onNavigate && onNavigate('shop', 'Jackets')}
          className="group relative flex items-center justify-center overflow-hidden h-[500px] md:h-[700px] cursor-pointer bg-white"
        >
          <img 
            src={banner3} 
            alt="Editorial Feature 03" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-1000 ease-out group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 z-10"></div>
          <button className="relative z-20 px-10 py-3.5 border border-white text-white text-[10px] font-label-caps tracking-[0.3em] font-bold transition-all duration-300 hover:bg-white hover:text-[#111] backdrop-blur-[1px] uppercase">
            Jackets
          </button>
        </div>

        {/* Banner 4 - Jeans */}
        <div 
          onClick={() => onNavigate && onNavigate('shop', 'Jeans')}
          className="group relative flex items-center justify-center overflow-hidden h-[500px] md:h-[700px] cursor-pointer bg-white"
        >
          <img 
            src={banner4} 
            alt="Editorial Feature 04" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-1000 ease-out group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 z-10"></div>
          <button className="relative z-20 px-10 py-3.5 border border-white text-white text-[10px] font-label-caps tracking-[0.3em] font-bold transition-all duration-300 hover:bg-white hover:text-[#111] backdrop-blur-[1px] uppercase:opacity-75">
            Jeans
          </button>
        </div>

        {/* Banner 5 - Leather Jackets */}
        <div 
          onClick={() => onNavigate && onNavigate('shop', 'Leather Jackets')}
          className="group relative flex items-center justify-center overflow-hidden h-[500px] md:h-[700px] cursor-pointer bg-white"
        >
          <img 
            src={banner5} 
            alt="Editorial Feature 05" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-1000 ease-out group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 z-10"></div>
          <button className="relative z-20 px-10 py-3.5 border border-white text-white text-[10px] font-label-caps tracking-[0.3em] font-bold transition-all duration-300 hover:bg-white hover:text-[#111] backdrop-blur-[1px] uppercase:opacity-75">
            Leather Jackets
          </button>
        </div>

        {/* Banner 6 - Accessories */}
        <div 
          onClick={() => onNavigate && onNavigate('shop', 'Accessories')}
          className="group relative flex items-center justify-center overflow-hidden h-[500px] md:h-[700px] cursor-pointer bg-white"
        >
          <img 
            src={banner6} 
            alt="Editorial Feature 06" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-1000 ease-out group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 z-10"></div>
          <button className="relative z-20 px-10 py-3.5 border border-white text-white text-[10px] font-label-caps tracking-[0.3em] font-bold transition-all duration-300 hover:bg-white hover:text-[#111] backdrop-blur-[1px] uppercase:opacity-75">
            Accessories
          </button>
        </div>

      </section>
    </div>
  );
};

export default Lifestyle;
