import React from 'react';
import logo from '../assets/logo.png';
import searchIcon from '../assets/search_24dp_E3E3E3_FILL0_wght200_GRAD0_opsz24.png';
import favoriteIcon from '../assets/favorite_24dp_E3E3E3_FILL0_wght200_GRAD0_opsz24.png';
import cartIcon from '../assets/shopping_cart_24dp_E3E3E3_FILL0_wght200_GRAD0_opsz24.png';

const Header = ({ onNavigate, currentPage }) => {
  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-2 border-b border-primary">
      {/* Left section: Logo */}
      <div className="flex items-center flex-1">
        <button 
          onClick={() => onNavigate('home')}
          className="flex justify-center items-center h-10 w-10 md:h-14 md:w-14 hover:opacity-80 transition-opacity focus:outline-none"
        >
          <img src={logo} alt="3ft Logo" className="object-contain h-full w-full" />
        </button>
      </div>
      
      {/* Center section: Navigation */}
      <nav className="flex justify-center gap-2 md:gap-4 font-label-caps text-label-caps text-primary flex-1 !font-black text-[16px] tracking-widest items-center">
        <button 
          onClick={() => onNavigate('home')}
          className={`px-6 py-2 rounded-full hover:bg-[#9a2a2a]/20 hover:text-[#9a2a2a] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            currentPage === 'home' ? 'bg-[#9a2a2a]/10 text-[#9a2a2a]' : ''
          }`}
        >
          HOME
        </button>
        <button 
          onClick={() => onNavigate('shop')}
          className={`px-6 py-2 rounded-full hover:bg-[#9a2a2a]/20 hover:text-[#9a2a2a] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            currentPage === 'shop' ? 'bg-[#9a2a2a]/10 text-[#9a2a2a]' : ''
          }`}
        >
          SHOP
        </button>
        <button 
          onClick={() => {
            if (currentPage !== 'home') {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="px-6 py-2 rounded-full hover:bg-[#9a2a2a]/20 hover:text-[#9a2a2a] transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          CONTACT
        </button>
      </nav>

      {/* Right section: Search, Liked & Cart */}
      <div className="flex justify-end items-center gap-2 flex-1 pr-2">
        <div className="group flex items-center h-10 rounded-full hover:bg-[#9a2a2a]/20 cursor-pointer px-2.5 transition-all duration-300">
          <img src={searchIcon} alt="Search" className="w-5 h-5 opacity-80 brightness-0 shrink-0" />
          <div className="max-w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-w-[100px]">
            <span className="pl-2 text-[10px] md:text-xs font-label-caps tracking-widest text-[#9a2a2a] whitespace-nowrap block pt-0.5">SEARCH</span>
          </div>
        </div>
        <div className="group flex items-center h-10 rounded-full hover:bg-[#9a2a2a]/20 cursor-pointer px-2.5 transition-all duration-300">
          <img src={favoriteIcon} alt="Liked" className="w-5 h-5 opacity-80 brightness-0 shrink-0" />
          <div className="max-w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-w-[100px]">
            <span className="pl-2 text-[10px] md:text-xs font-label-caps tracking-widest text-[#9a2a2a] whitespace-nowrap block pt-0.5">LIKED</span>
          </div>
        </div>
        <div className="group flex items-center h-10 rounded-full hover:bg-[#9a2a2a]/20 cursor-pointer px-2.5 transition-all duration-300">
          <img src={cartIcon} alt="Cart" className="w-5 h-5 opacity-80 brightness-0 shrink-0" />
          <div className="max-w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-w-[100px]">
            <span className="pl-2 text-[10px] md:text-xs font-label-caps tracking-widest text-[#9a2a2a] whitespace-nowrap block pt-0.5">CART</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
