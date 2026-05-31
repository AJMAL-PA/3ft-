import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public components (unchanged design)
import Header from './components/Header';
import Hero from './components/Hero';
import EditorialSection from './components/EditorialSection';
import ProductShowcase from './components/ProductShowcase';
import Shop from './components/Shop';
import Lifestyle from './components/Lifestyle';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import ProductDetail from './components/ProductDetail';

// Admin components
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import CategoryManager from './components/admin/CategoryManager';
import AttributeManager from './components/admin/AttributeManager';
import ProductManager from './components/admin/ProductManager';
import AdminSettings from './components/admin/AdminSettings';

// Contexts
import { AdminProvider } from './context/AdminContext';
import { SettingsProvider } from './context/SettingsContext';

// Public site wrapper (preserves the exact existing design)
function PublicSite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previousPage, setPreviousPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleNavigate = (page, param = null) => {
    if (page === 'product-detail') {
      setPreviousPage(currentPage);
      setSelectedProduct(param);
    } else if (page === 'shop' && typeof param === 'string') {
      setSelectedCategory(param);
    }
    setCurrentPage(page);
  };

  const handlePreloaderComplete = () => {
    setPreloaderActive(false);
    setPreloaderFinished(true);
  };

  return (
    <div className="bg-background text-on-background font-body-base overflow-x-clip min-h-screen flex flex-col">
      {preloaderActive && <Preloader onComplete={handlePreloaderComplete} />}

      <Header 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <main className="w-full flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={handleNavigate} preloaderFinished={preloaderFinished} />
            <EditorialSection onNavigate={handleNavigate} />
            <ProductShowcase onNavigate={handleNavigate} />
            <Lifestyle onNavigate={handleNavigate} />
            <Contact />
          </>
        ) : currentPage === 'shop' ? (
          <Shop 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            onNavigate={handleNavigate} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <ProductDetail product={selectedProduct} onNavigate={handleNavigate} previousPage={previousPage} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <SettingsProvider>
        <Routes>
          {/* Admin auth */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected admin panel */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="attributes" element={<AttributeManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Public site — all other routes */}
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </SettingsProvider>
    </AdminProvider>
  );
}

export default App;
