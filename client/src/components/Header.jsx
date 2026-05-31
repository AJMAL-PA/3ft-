import React, { useState, useEffect, useMemo } from 'react';
import logo from '../assets/logo.png';
import searchIcon from '../assets/search_24dp_E3E3E3_FILL0_wght200_GRAD0_opsz24.png';
import luxuryMenuStrip from '../assets/luxury_menu_strip.png';
import { useSettings } from '../context/SettingsContext';
import { categoryService } from '../services/categoryService';

const Header = ({ onNavigate, currentPage, searchQuery, setSearchQuery }) => {
  const { getWhatsAppUrl } = useSettings();
  const [isSearchOpen, setIsSearchOpen] = useState(!!searchQuery);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAll();
        setCategories(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Error fetching categories in header:", err);
      }
    };
    fetchCategories();
  }, []);

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase().trim();
    return categories.filter(cat => {
      const name = cat.name || cat;
      return typeof name === 'string' && name.toLowerCase().includes(query);
    });
  }, [categories, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      // The navbar background only hides on the hero page by default (at the very top).
      // As soon as the user scrolls down, the background appears and remains visible.
      const threshold = 20;
      
      if (currentScrollY > threshold) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    
    // Check initial scroll position on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setHasScrolled(false);
  }, [currentPage]);

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
      <header className={`sticky top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-2 border-b transition-all duration-500 ease-in-out ${
        currentPage === 'home'
          ? !hasScrolled
            ? 'bg-transparent border-transparent md:bg-background/95 md:backdrop-blur-sm md:border-primary'
            : 'bg-background/95 backdrop-blur-sm border-primary'
          : 'bg-background/95 backdrop-blur-sm border-primary'
      }`}>
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
          <div className="relative hidden md:block">
            <div className="flex items-center gap-2 bg-[#9a2a2a]/5 border border-[#9a2a2a]/20 rounded-full px-3 py-1.5 transition-all duration-300 w-32 sm:w-44 md:w-64">
              <span className="material-symbols-outlined text-[18px] text-[#9a2a2a] opacity-60 shrink-0">search</span>
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
                className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none text-xs font-label-caps tracking-widest text-[#9a2a2a] placeholder:text-[#9a2a2a]/40 w-full"
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

            {/* Desktop Suggestions Dropdown */}
            {searchQuery && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-primary/20 shadow-lg rounded-lg py-2 z-50 max-h-60 overflow-y-auto w-full">
                <p className="px-4 py-1 text-[8px] tracking-[0.2em] font-bold text-primary/45 font-label-caps uppercase border-b border-primary/5 mb-1">SUGGESTED CATEGORIES</p>
                {suggestions.map((cat) => (
                  <button
                    key={cat._id || cat}
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                      onNavigate('shop', cat.name || cat);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#9a2a2a]/10 text-primary text-xs font-label-caps tracking-wider uppercase font-semibold transition-colors duration-200"
                  >
                    {cat.name || cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex group items-center h-10 rounded-full hover:bg-[#9a2a2a]/20 cursor-pointer px-2.5 transition-all duration-300 focus:outline-none"
          >
            <span className="material-symbols-outlined text-[20px] text-[#9a2a2a] shrink-0 opacity-80 group-hover:scale-105 transition-transform duration-300">search</span>
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
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#9a2a2a]/10 transition-colors duration-300 focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px] text-[#9a2a2a]">search</span>
        </button>

        {/* Mobile Hamburger Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden flex flex-col justify-between items-end w-6 h-4 cursor-pointer focus:outline-none relative z-[90] transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Toggle Menu"
        >
          <span className="block h-[1px] bg-[#9a2a2a] transition-all duration-300 w-full"></span>
          <span className="block h-[1px] bg-[#9a2a2a] transition-all duration-300 w-2/3"></span>
          <span className="block h-[1px] bg-[#9a2a2a] transition-all duration-300 w-1/2"></span>
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
        <div className="w-[32px] sm:w-[48px] h-full relative overflow-hidden bg-black border-r border-black/5 flex-shrink-0">
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
            
            {/* Top Row: Exit Button */}
            <div className="flex justify-end items-center w-full mb-8 pr-2">
              {/* Cross (Close) Button */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all text-xs font-bold text-primary focus:outline-none"
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-6 w-full items-start pl-4 sm:pl-8 mt-4">
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={`font-headline-lg text-4xl tracking-wider uppercase transition-all duration-300 hover:text-[#9a2a2a] focus:outline-none cursor-pointer ${
                  currentPage === 'home' 
                    ? 'text-[#9a2a2a]' 
                    : 'text-[#111]'
                }`}
              >
                HOME
              </button>
              <button 
                onClick={() => {
                  onNavigate('shop');
                  setIsMenuOpen(false);
                }}
                className={`font-headline-lg text-4xl tracking-wider uppercase transition-all duration-300 hover:text-[#9a2a2a] focus:outline-none cursor-pointer ${
                  currentPage === 'shop' 
                    ? 'text-[#9a2a2a]' 
                    : 'text-[#111]'
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
                className="font-headline-lg text-4xl tracking-wider uppercase text-[#111] hover:text-[#9a2a2a] transition-all duration-300 focus:outline-none cursor-pointer"
              >
                CONTACT
              </button>

              {/* Get in Touch Button */}
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
                className="mt-6 bg-transparent border border-primary text-primary hover:bg-[#9a2a2a]/20 hover:text-[#9a2a2a] hover:border-[#9a2a2a]/30 px-6 py-2.5 rounded-full font-label-caps text-[10px] sm:text-xs font-bold tracking-widest transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase whitespace-nowrap focus:outline-none cursor-pointer"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                GET IN TOUCH
              </button>

              {/* Logo & Brand Info below buttons */}
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className="mt-8 flex justify-start items-center gap-3.5 hover:opacity-80 transition-opacity focus:outline-none"
              >
                <img src={logo} alt="3ft Logo" className="object-contain h-14 w-14 shrink-0" />
                <div className="flex flex-col items-start font-label-caps select-none leading-none pt-0.5">
                  <span className="text-xs font-black tracking-[0.2em] text-[#9a2a2a]">3FT ARCHIVE</span>
                  <span className="text-[8px] font-bold tracking-[0.15em] text-[#111]/40 uppercase mt-1">STYLE STUDIO • EST. 2026</span>
                </div>
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
          <div className="relative z-10 flex justify-center items-center gap-6 pt-6 border-t border-black/5 mt-6 w-full">
            {/* WhatsApp */}
            <a 
              href={getWhatsAppUrl()}
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer"
              aria-label="WhatsApp"
            >
              <div className="w-10 h-10 rounded-full bg-[#f2ede4] border border-[#9a2a2a]/15 flex items-center justify-center text-[#9a2a2a] group-hover:text-[#25D366] group-hover:bg-[#ece8df] group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
              </div>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/3riiift_/"
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer"
              aria-label="Instagram"
            >
              <div className="w-10 h-10 rounded-full bg-[#f2ede4] border border-[#9a2a2a]/15 flex items-center justify-center text-[#9a2a2a] group-hover:text-[#E1306C] group-hover:bg-[#ece8df] group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </div>
            </a>

            {/* Gmail */}
            <a 
              href="mailto:3ftarchive@gmail.com"
              className="group cursor-pointer"
              aria-label="Gmail"
            >
              <div className="w-10 h-10 rounded-full bg-[#f2ede4] border border-[#9a2a2a]/15 flex items-center justify-center text-[#9a2a2a] group-hover:text-[#EA4335] group-hover:bg-[#ece8df] group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.086c0 .75-.6 1.357-1.35 1.357h-3.825v-9.6L12 15L5.175 10.3v9.6H1.35C.6 19.9 0 19.3 0 18.543V5.457c0-.75.6-1.357 1.35-1.357H3.9L12 10.8l8.1-6.7h2.55c.75 0 1.35.6 1.35 1.357z"/>
                </svg>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
     {/* Mobile Search Overlay */}
    {isMobileSearchOpen && (
      <div className="fixed inset-0 z-[100] bg-background/50 backdrop-blur-sm flex flex-col p-6 font-body-base">
        <div className="flex justify-between items-center mb-10">
          <span className="font-label-caps text-xs tracking-[0.2em] text-[#9a2a2a] font-black">SEARCH PRODUCTS</span>
          <button 
            onClick={() => setIsMobileSearchOpen(false)}
            className="w-10 h-10 rounded-full border border-[#9a2a2a]/20 text-[#9a2a2a] flex items-center justify-center hover:bg-[#9a2a2a]/10 hover:text-[#9a2a2a] transition-all cursor-pointer text-sm font-bold focus:outline-none"
          >
            ✕
          </button>
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            setIsMobileSearchOpen(false);
          }}
          className="flex items-center gap-3 border-b border-[#9a2a2a]/20 pb-4 w-full"
        >
          <button 
            type="submit"
            className="flex items-center justify-center p-1 hover:bg-[#9a2a2a]/10 rounded-full transition-colors cursor-pointer focus:outline-none shrink-0"
            aria-label="Submit Search"
          >
            <span className="material-symbols-outlined text-[20px] text-[#9a2a2a] opacity-80">search</span>
          </button>
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
            className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none text-base font-label-caps tracking-widest text-[#9a2a2a] placeholder:text-[#9a2a2a]/40 w-full"
            autoFocus
          />
        </form>

        {/* Mobile Suggestions */}
        {searchQuery && suggestions.length > 0 && (
          <div className="mt-6 bg-[#f7f7f7] border border-black/5 rounded-lg py-3 w-full">
            <p className="px-4 py-1 text-[8px] tracking-[0.2em] font-bold text-gray-400 font-label-caps uppercase border-b border-black/5 mb-1">SUGGESTED CATEGORIES</p>
            <div className="flex flex-col">
              {suggestions.map((cat) => (
                <button
                  key={cat._id || cat}
                  onClick={() => {
                    setSearchQuery('');
                    setIsMobileSearchOpen(false);
                    onNavigate('shop', cat.name || cat);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-black/5 text-[#111] text-xs font-label-caps tracking-wider uppercase font-semibold transition-colors duration-200 border-b border-black/[0.02] last:border-b-0"
                >
                  {cat.name || cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-[10px] text-gray-400 mt-4 tracking-widest font-bold uppercase">
          Tap the search button or press Enter to view results
        </p>
      </div>
    )}
  </>
);
};

export default Header;
