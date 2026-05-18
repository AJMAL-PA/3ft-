import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EditorialSection from './components/EditorialSection';
import ProductShowcase from './components/ProductShowcase';
import Shop from './components/Shop';
import Lifestyle from './components/Lifestyle';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

import Contact from './components/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'shop'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Automatically scroll to top when navigating to different pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleNavigate = (page, category = 'All') => {
    setCurrentPage(page);
    setSelectedCategory(category);
  };

  return (
    <div className="bg-background text-on-background font-body-base overflow-x-hidden min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main className="w-full flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={handleNavigate} />
            <EditorialSection />
            <ProductShowcase onNavigate={handleNavigate} />
            <Lifestyle onNavigate={handleNavigate} />
            <Contact />
            <Newsletter />
          </>
        ) : (
          <Shop selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
