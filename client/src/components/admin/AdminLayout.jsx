import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Toaster } from 'react-hot-toast';

const pageTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/categories': 'Category Management',
  '/admin/attributes': 'Attribute Management',
  '/admin/products': 'Product Management',
  '/admin/settings': 'Store Settings',
};

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Admin Panel';

  React.useEffect(() => {
    // Save original styles
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    const originalMinHeight = document.body.style.minHeight;

    // Apply styles to prevent body scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.minHeight = '0';

    return () => {
      // Restore original styles
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.body.style.minHeight = originalMinHeight;
    };
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-[#f7f3ea]" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px' },
          success: { iconTheme: { primary: '#9a2a2a', secondary: '#fff' } },
        }}
      />

      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="font-black text-base uppercase tracking-[0.2em] text-[#111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {title}
              </h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                3FT ARCHIVES ADMIN
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-[10px] tracking-widest uppercase text-gray-500 hover:text-[#9a2a2a] transition-colors border border-gray-200 px-3 py-2 rounded-lg hover:border-[#9a2a2a]/30"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Store
            </a>
            <div className="w-8 h-8 rounded-full bg-[#9a2a2a]/10 flex items-center justify-center">
              <span className="text-[#9a2a2a] text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
