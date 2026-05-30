import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { settingsService } from '../../services/settingsService';
import { useSettings } from '../../context/SettingsContext';

export default function AdminSettings() {
  const { setSettings } = useSettings();
  const [form, setForm] = useState({ whatsappNumber: '', storeName: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await settingsService.get();
        if (res.data.success) {
          setForm({
            whatsappNumber: res.data.data.whatsappNumber || '',
            storeName: res.data.data.storeName || '',
          });
        }
      } catch { toast.error('Failed to load settings'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.whatsappNumber.trim()) { toast.error('WhatsApp number is required'); return; }
    setSaving(true);
    try {
      const res = await settingsService.update(form);
      if (res.data.success) {
        setSettings(res.data.data);
        toast.success('Settings saved successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const whatsappPreview = form.whatsappNumber
    ? `https://wa.me/${form.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent('I want to buy a product')}`
    : '';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-[#9a2a2a]/30 border-t-[#9a2a2a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSave}>
        {/* WhatsApp Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="px-6 py-5 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-[0.15em] text-[#111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>WhatsApp Settings</h3>
                <p className="text-xs text-gray-400" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>Configure the WhatsApp number for product inquiries</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                WhatsApp Number *
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-sm" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                  +
                </div>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="919846417073"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9a2a2a] transition-colors"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                Enter full number with country code (e.g., 919846417073 for India)
              </p>
            </div>

            {/* Live Preview */}
            {whatsappPreview && (
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Preview Link</p>
                <a
                  href={whatsappPreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-600 hover:underline break-all"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                >
                  {whatsappPreview}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Store Name Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Store Name</label>
            <input
              type="text"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              placeholder="3FT Archives"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9a2a2a] transition-colors"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-[#0b0b0b] hover:bg-[#9a2a2a] text-white rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-3"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'SAVING...' : 'SAVE SETTINGS'}
        </button>
      </form>
    </div>
  );
}
