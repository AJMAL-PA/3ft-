import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useSettings } from '../context/SettingsContext';

const Footer = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const { getWhatsAppUrl } = useSettings();

  return (
    <footer className="bg-primary text-on-primary px-margin-mobile md:px-margin-desktop py-12 md:py-16 border-t border-primary">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Section: Grid layout with Logo, CTA, Nav Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 items-center w-full">
          {/* Left Section: Logo */}
          <div className="flex justify-center md:justify-start items-center order-1">
            <button 
              onClick={() => onNavigate && onNavigate('home')} 
              className="h-12 md:h-16 flex items-center justify-center md:justify-start opacity-90 hover:opacity-100 transition-opacity cursor-pointer focus:outline-none"
            >
              <img 
                src={logo} 
                alt="3ft Logo" 
                className="h-full w-auto object-contain" 
              />
            </button>
          </div>

          {/* Center Section: Navigation Links & CTA Icons */}
          <div className="flex flex-col items-center gap-6 order-2">
            {/* Nav Links */}
            <div className="flex gap-12 md:gap-16 text-[10px] tracking-[0.2em] font-bold justify-center items-center font-label-caps uppercase">
              <button 
                onClick={() => onNavigate && onNavigate('home')}
                className="hover:text-[#9a2a2a] transition-colors duration-300 focus:outline-none"
              >
                HOME
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('shop')}
                className="hover:text-[#9a2a2a] transition-colors duration-300 focus:outline-none"
              >
                SHOP
              </button>
              <button 
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="hover:text-[#9a2a2a] transition-colors duration-300 focus:outline-none"
              >
                CONTACT
              </button>
            </div>

            {/* CTA Icons */}
            <div className="flex items-center gap-6">
              {/* WhatsApp */}
              <a 
                href={getWhatsAppUrl()}
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer"
                aria-label="WhatsApp"
              >
                <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-white group-hover:bg-[#25D366] group-hover:text-white group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
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
                <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-white group-hover:bg-[#E1306C] group-hover:text-white group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
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
                <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-white group-hover:bg-[#EA4335] group-hover:text-white group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.086c0 .75-.6 1.357-1.35 1.357h-3.825v-9.6L12 15L5.175 10.3v9.6H1.35C.6 19.9 0 19.3 0 18.543V5.457c0-.75.6-1.357 1.35-1.357H3.9L12 10.8l8.1-6.7h2.55c.75 0 1.35.6 1.35 1.357z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Right Section: Empty placeholder for desktop visual symmetry */}
          <div className="hidden md:block order-3"></div>
        </div>

        {/* Bottom Section: Divider & Copyright */}
        <div className="mt-12 md:mt-16 border-t border-on-primary/10 pt-8 flex flex-col items-center justify-center">
          <p className="font-label-caps text-[10px] tracking-[0.2em] text-on-primary/60 font-bold uppercase text-center">
            © {new Date().getFullYear()} 3FT ARCHIVES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* Floating Back to Top Button (All screen sizes) */}
      {isVisible && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[99] w-11 h-11 md:w-12 md:h-12 bg-[#0b0b0b] text-white border border-[#9a2a2a]/20 hover:border-[#9a2a2a] hover:text-[#9a2a2a] shadow-lg flex items-center justify-center rounded-full focus:outline-none transition-all duration-300 transform active:scale-95 cursor-pointer"
          style={{ backdropFilter: 'blur(4px)' }}
          aria-label="Scroll to top"
        >
          <span className="material-symbols-outlined text-base">arrow_upward</span>
        </button>
      )}
    </footer>
  );
};

export default Footer;
