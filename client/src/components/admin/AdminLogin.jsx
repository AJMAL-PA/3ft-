import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLogin() {
  const { login, admin } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (admin) navigate('/admin/dashboard', { replace: true });
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      if (res.data.success) {
        login(res.data.token, res.data.admin);
        toast.success('Welcome back, Admin!');
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center p-6">
      <Toaster position="top-right" />

      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-[#9a2a2a] rounded-full" />
            <div className="w-2 h-2 bg-[#9a2a2a] rounded-full opacity-60" />
            <div className="w-2 h-2 bg-[#9a2a2a] rounded-full opacity-30" />
          </div>
          <h1 className="text-white font-black text-3xl tracking-[0.3em] uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            3FT ADMIN
          </h1>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-2" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
            Archive Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white/50 text-[10px] tracking-[0.2em] uppercase font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@gmail.com"
                className="w-full bg-[#0b0b0b] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#9a2a2a] transition-colors placeholder:text-white/20"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/50 text-[10px] tracking-[0.2em] uppercase font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#0b0b0b] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#9a2a2a] transition-colors pr-12 placeholder:text-white/20"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9a2a2a] hover:bg-[#b03030] text-white py-4 rounded-xl font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  SIGNING IN...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <a
              href="/"
              className="text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              ← Back to Store
            </a>
          </div>
        </div>

        <p className="text-center text-white/20 text-[10px] tracking-widest uppercase mt-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          © {new Date().getFullYear()} 3FT ARCHIVES
        </p>
      </div>
    </div>
  );
}
