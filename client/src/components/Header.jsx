import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import searchIcon from '../assets/search_24dp_E3E3E3_FILL0_wght200_GRAD0_opsz24.png';
import luxuryMenuStrip from '../assets/luxury_menu_strip.png';

const Header = ({ onNavigate, currentPage, searchQuery, setSearchQuery }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(!!searchQuery);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen || isMobileSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMobileSearchOpen]);
  return (
    <>
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
        <nav className="hidden md:flex justify-center gap-2 md:gap-4 font-label-caps text-label-caps text-primary flex-1 !font-black text-[16px] tracking-widest items-center">
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

      {/* Right section: Search & Get in Touch */}
      <div className="flex justify-end items-center gap-2 md:gap-4 flex-1 pr-2">
        {isSearchOpen ? (
          <div className="hidden md:flex items-center gap-2 bg-[#9a2a2a]/5 border border-[#9a2a2a]/20 rounded-full px-3 py-1.5 transition-all duration-300 w-32 sm:w-44 md:w-64">
            <img src={searchIcon} alt="Search" className="w-4 h-4 opacity-60 brightness-0 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPage !== 'shop') {
                  onNavigate('shop');
                }
              }}
              placeholder="SEARCH..."
              className="bg-transparent border-none outline-none text-xs font-label-caps tracking-widest text-[#9a2a2a] placeholder:text-[#9a2a2a]/40 w-full"
              autoFocus
            />
            <button 
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="text-[#9a2a2a] hover:opacity-100 opacity-60 font-bold text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex group items-center h-10 rounded-full hover:bg-[#9a2a2a]/20 cursor-pointer px-2.5 transition-all duration-300 focus:outline-none"
          >
            <img src={searchIcon} alt="Search" className="w-5 h-5 opacity-80 brightness-0 shrink-0" />
            <div className="max-w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-w-[100px]">
              <span className="pl-2 text-[10px] md:text-xs font-label-caps tracking-widest text-[#9a2a2a] whitespace-nowrap block pt-0.5">SEARCH</span>
            </div>
          </button>
        )}
        
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
          className="hidden sm:inline-block bg-transparent border border-primary text-primary hover:bg-[#9a2a2a]/20 hover:text-[#9a2a2a] hover:border-[#9a2a2a]/30 px-3.5 md:px-5 py-2 md:py-2.5 rounded-full font-label-caps text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase whitespace-nowrap"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          GET IN TOUCH
        </button>

        {/* Mobile Search Button */}
        <button 
          onClick={() => setIsMobileSearchOpen(true)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition-colors duration-300 focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px] text-primary">search</span>
        </button>

        {/* Mobile Hamburger Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden flex flex-col justify-between items-end w-6 h-4 cursor-pointer focus:outline-none relative z-[90] transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Toggle Menu"
        >
          <span className="block h-[1px] bg-primary transition-all duration-300 w-full"></span>
          <span className="block h-[1px] bg-primary transition-all duration-300 w-2/3"></span>
          <span className="block h-[1px] bg-primary transition-all duration-300 w-1/2"></span>
        </button>
      </div>
    </header>

    {/* Mobile Drawer Overlay */}
    <div className={`fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm transition-opacity duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
      <div 
        className={`absolute top-0 right-0 bottom-0 w-full max-w-[420px] bg-[#F7F7F7] shadow-2xl flex transform transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Vertical Image Strip */}
        <div className="w-[60px] sm:w-[80px] h-full relative overflow-hidden bg-black border-r border-black/5 flex-shrink-0">
          <img 
            src={luxuryMenuStrip} 
            alt="Luxury Monochrome Texture Detail" 
            className={`w-full h-full object-cover filter grayscale brightness-[0.65] contrast-[1.1] transition-all duration-1000 ${isMenuOpen ? 'scale-100 translate-y-0 opacity-80' : 'scale-115 translate-y-5 opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>

        {/* Right Side: Soft White Content Panel */}
        <div className="flex-grow p-6 pb-8 pt-20 sm:px-10 sm:pb-8 sm:pt-24 flex flex-col justify-between relative overflow-hidden">
          
          {/* Top Wrapper (Search Bar & Nav Links) */}
          <div className="relative z-10 flex flex-col items-center w-full">
            
            {/* Top Row: Search Bar & Exit Button */}
            <div className="flex justify-between items-center w-full mb-10 gap-4">
              {/* Search bar on top */}
              <div className="flex-grow flex items-center gap-2 border-b border-black/15 pb-2">
                <span className="material-symbols-outlined text-[18px] text-primary/60">search</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentPage !== 'shop') {
                      onNavigate('shop');
                    }
                  }}
                  placeholder="SEARCH PRODUCTS..." 
                  className="bg-transparent border-none outline-none text-xs font-label-caps tracking-widest text-primary w-full placeholder:text-primary/30"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-primary/60 hover:text-black font-bold text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Cross (Close) Button */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all text-xs font-bold text-primary focus:outline-none flex-shrink-0"
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 w-full items-center">
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={`w-full max-w-[200px] px-6 py-2.5 rounded-full font-label-caps font-black text-xs tracking-widest text-center transition-all duration-300 transform active:scale-95 shadow-sm border border-primary/10 ${
                  currentPage === 'home' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-primary hover:bg-black/5 hover:text-black'
                }`}
              >
                HOME
              </button>
              <button 
                onClick={() => {
                  onNavigate('shop');
                  setIsMenuOpen(false);
                }}
                className={`w-full max-w-[200px] px-6 py-2.5 rounded-full font-label-caps font-black text-xs tracking-widest text-center transition-all duration-300 transform active:scale-95 shadow-sm border border-primary/10 ${
                  currentPage === 'shop' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-primary hover:bg-black/5 hover:text-black'
                }`}
              >
                SHOP
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  if (currentPage !== 'home') {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full max-w-[200px] px-6 py-2.5 rounded-full bg-white text-primary font-label-caps font-black text-xs tracking-widest text-center transition-all duration-300 transform active:scale-95 shadow-sm border border-primary/10 hover:bg-black/5 hover:text-black"
              >
                CONTACT
              </button>
            </nav>
            
          </div>

          {/* Logo Emblem Background Decor (Slow rotation, centered) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] pointer-events-none opacity-[0.03] flex justify-center items-center z-0">
            <svg className="w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path id="textPath" d="M 100, 100 m -65, 0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0" fill="none" />
              <text className="font-sans text-[10px] fill-black tracking-[0.2em] uppercase">
                <textPath href="#textPath" startOffset="0%">3FT THRIFTED CLOTHING • EST. 2026 • STYLE STUDIO •</textPath>
              </text>
              <circle cx="100" cy="100" r="28" stroke="black" strokeWidth="0.5" strokeDasharray="2 3" fill="none" />
              <polygon points="100,82 108,100 126,100 111,109 117,127 100,116 83,127 89,109 74,100 92,100" fill="black" />
            </svg>
          </div>

          {/* Bottom Footer Section */}
          <div className="relative z-10 flex justify-between items-center pt-6 border-t border-black/5 mt-6">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 font-label-caps text-[10px] tracking-widest">
              <button className="font-bold text-primary opacity-100">EN</button>
              <span className="opacity-15 text-primary">/</span>
              <button class="font-bold text-primary opacity-30 hover:opacity-100 transition-opacity">AR</button>
            </div>

            {/* Central highlight dot */}
            <div className="w-1 h-1 rounded-full bg-black"></div>

            {/* Mock Search Button Triggers Header Overlay */}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                setIsMobileSearchOpen(true);
              }}
              className="w-6 h-6 flex justify-center items-center text-primary opacity-60 hover:opacity-100 hover:text-black transition-all"
              aria-label="Search"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>

    {/* Mobile Search Overlay */}
    {isMobileSearchOpen && (
      <div className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-lg flex flex-col p-6 font-body-base">
        <div className="flex justify-between items-center mb-10">
          <span className="font-label-caps text-xs tracking-[0.2em] text-[#9a2a2a] font-black">SEARCH PRODUCTS</span>
          <button 
            onClick={() => setIsMobileSearchOpen(false)}
            className="w-10 h-10 rounded-full border border-[#9a2a2a]/20 text-[#9a2a2a] flex items-center justify-center hover:bg-[#9a2a2a]/10 hover:text-[#9a2a2a] transition-all cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </div>
        <div className="flex items-center gap-3 border-b border-[#9a2a2a]/20 pb-4">
          <img src={searchIcon} alt="Search" className="w-5 h-5 opacity-60 brightness-0 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentPage !== 'shop') {
                onNavigate('shop');
              }
            }}
            placeholder="TYPE TO SEARCH..."
            className="bg-transparent border-none outline-none text-base font-label-caps tracking-widest text-[#9a2a2a] placeholder:text-[#9a2a2a]/40 w-full"
            autoFocus
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-4 tracking-widest font-bold uppercase">
          Tap the "✕" button to close search
        </p>
      </div>
    )}
  </>
);
};

export default Header;
