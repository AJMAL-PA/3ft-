import React from 'react';
import searchIcon from '../assets/search_24dp_E3E3E3_FILL0_wght200_GRAD0_opsz24.png';

const categories = ["ALL", "OUTERWEAR", "T-SHIRTS", "BOTTOMS"];

const SearchSection = () => {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-12 bg-surface-variant border-b border-primary">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Search Bar Removed as requested */}

        {/* Category Pills */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2 justify-start md:justify-center">
          {categories.map((cat, index) => (
            <button 
              key={index} 
              className={`whitespace-nowrap px-6 py-2 rounded-full font-label-caps text-label-caps border transition-colors ${
                index === 0 
                  ? 'bg-[#9a2a2a] border-[#9a2a2a] text-surface' 
                  : 'bg-transparent border-primary text-primary hover:bg-[#9a2a2a] hover:border-[#9a2a2a] hover:text-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default SearchSection;
