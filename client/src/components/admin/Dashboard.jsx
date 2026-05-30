import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';

const StatCard = ({ label, value, icon, accent = false }) => (
  <div className={`bg-white rounded-2xl p-6 border ${accent ? 'border-[#9a2a2a]/20' : 'border-gray-100'} shadow-sm`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {label}
        </p>
        <p className={`text-4xl font-black ${accent ? 'text-[#9a2a2a]' : 'text-[#111]'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {value ?? '—'}
        </p>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent ? 'bg-[#9a2a2a]/10 text-[#9a2a2a]' : 'bg-gray-50 text-gray-400'}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await productService.getStats();
        setStats(res.data.data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#9a2a2a]/30 border-t-[#9a2a2a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Products"
          value={stats?.totalProducts}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
        />
        <StatCard
          label="Categories"
          value={stats?.totalCategories}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
        />
        <StatCard
          label="Featured"
          value={stats?.featuredCount}
          accent={true}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
        />
        <StatCard
          label="In Stock"
          value={stats?.inStockCount}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-black text-sm uppercase tracking-[0.2em] text-[#111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Recent Products
          </h2>
          <a href="/admin/products" className="text-[10px] text-[#9a2a2a] font-bold tracking-widest uppercase hover:underline" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            View All →
          </a>
        </div>

        {stats?.recentProducts?.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {stats.recentProducts.map((p) => (
              <div key={p._id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/48'; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#111] truncate uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {p.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                    {p.category?.name} · /{p.sku}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm text-[#111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    ₹{p.price?.toLocaleString()}
                  </p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${p.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {p.inStock ? 'In Stock' : 'Out'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400">
            <p className="text-sm" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>No products yet. Add your first product.</p>
          </div>
        )}
      </div>
    </div>
  );
}
