import React from 'react';
import logo from '../assets/logo.png';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-primary text-on-primary px-margin-mobile md:px-margin-desktop py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-t border-primary">
      <div className="space-y-6 flex flex-col items-start">
        <button 
          onClick={() => onNavigate && onNavigate('home')} 
          className="h-12 md:h-16 flex items-center justify-start opacity-90 hover:opacity-100 transition-opacity cursor-pointer focus:outline-none"
        >
          <img 
            src={logo} 
            alt="3ft Logo" 
            className="h-full w-auto object-contain" 
          />
        </button>
        <p className="font-label-caps text-[10px] tracking-[0.2em] text-on-primary/60 font-bold uppercase">
          © {new Date().getFullYear()} 3FT ARCHIVES. ALL RIGHTS RESERVED.
        </p>
      </div>
      <div className="grid grid-cols-2 md:flex gap-x-12 gap-y-4 text-[10px] tracking-[0.2em] font-bold">
        <a className="font-label-caps text-label-caps hover:text-[#9a2a2a] transition-colors duration-300" href="#">PRIVACY</a>
        <a className="font-label-caps text-label-caps hover:text-[#9a2a2a] transition-colors duration-300" href="#">TERMS</a>
        <a className="font-label-caps text-label-caps hover:text-[#9a2a2a] transition-colors duration-300" href="#">SHIPPING</a>
        <a className="font-label-caps text-label-caps hover:text-[#9a2a2a] transition-colors duration-300" href="#">INSTAGRAM</a>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 border border-on-primary/20 hover:border-[#9a2a2a] hover:text-[#9a2a2a] transition-colors flex items-center justify-center rounded-full group focus:outline-none"
        >
          <span className="material-symbols-outlined text-base group-hover:-translate-y-1 transition-transform">arrow_upward</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
