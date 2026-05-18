import React from 'react';

const ProductCard = ({ product }) => (
  <div className="product-card group relative flex flex-col bg-white shadow-sm hover:shadow-2xl transition-all duration-500 w-full">
    
    {/* Image Container */}
    <div className="relative w-full aspect-square overflow-hidden bg-[#eee] flex items-center justify-center border-b border-gray-100">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
        style={{ filter: 'grayscale(10%) contrast(110%)' }}
      />
      
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>

      {/* Actions Overlay */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0 ease-out">
         <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-[#111] hover:text-white text-[#111] transition-colors duration-300">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
         </button>
         <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-[#111] hover:text-white text-[#111] transition-colors duration-300">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
         </button>
      </div>

      {/* Dynamic Reveal CTA */}
      <div className="absolute bottom-4 left-4 right-4 z-20 overflow-hidden">
        <button className="w-full bg-white text-[#111] py-3 font-label-caps text-[10px] tracking-[0.2em] font-bold translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-[#111] hover:text-white shadow-lg">
          VIEW PRODUCT
        </button>
      </div>
    </div>

    {/* Details Container */}
    <div className="p-6 bg-white flex flex-col flex-grow h-[160px] justify-between">
      <div>
        <p className="text-gray-400 font-label-caps tracking-[0.2em] text-[9px] mb-2 uppercase font-semibold">{product.category}</p>
        <h4 className="font-headline-lg text-lg leading-tight text-[#111] mb-1 tracking-wide font-bold uppercase">{product.title}</h4>
        <p className="text-gray-400 text-[11px] font-mono">/{product.sku}</p>
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-auto">
        <p className="font-label-caps text-xs tracking-widest text-[#111] font-bold">{product.price}</p>
        <span className="text-[#9a2a2a] font-label-caps text-[9px] font-bold border border-[#9a2a2a]/20 px-2 py-0.5">IN STOCK</span>
      </div>
    </div>

  </div>
);

export default ProductCard;
