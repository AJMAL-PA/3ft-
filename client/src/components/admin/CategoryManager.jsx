import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { categoryService } from '../../services/categoryService';

const emptyForm = { name: '', image: null, imagePreview: '' };

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef();

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data.data || []);
    } catch {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => { setEditTarget(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (cat) => {
    setEditTarget(cat);
    setForm({ name: cat.name, image: null, imagePreview: cat.image || '' });
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); setForm(emptyForm); };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: file, imagePreview: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Category name is required'); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name.trim());
      if (form.image) fd.append('image', form.image);

      if (editTarget) {
        await categoryService.update(editTarget._id, fd);
        toast.success('Category updated!');
      } else {
        await categoryService.create(fd);
        toast.success('Category created!');
      }
      closeModal();
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete "${cat.name}"? This cannot be undone.`)) return;
    try {
      await categoryService.delete(cat._id);
      toast.success('Category deleted');
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {categories.length} Categories
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#0b0b0b] hover:bg-[#9a2a2a] text-white px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-6 h-6 border-2 border-[#9a2a2a]/30 border-t-[#9a2a2a] rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>No categories yet.</p>
            <button onClick={openAdd} className="text-[#9a2a2a] text-xs font-bold uppercase tracking-widest hover:underline" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Add your first category →</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Category</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hidden sm:table-cell" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Slug</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hidden md:table-cell" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Image</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-[#111] uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{cat.name}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-xs text-gray-400 font-mono">{cat.slug}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {cat.image ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                    ) : (
                      <span className="text-gray-300 text-xs">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(cat)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#111] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(cat)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-[0.2em] text-[#111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {editTarget ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Category Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Jackets"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-[#9a2a2a] transition-colors"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Category Image</label>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#9a2a2a]/40 transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  {form.imagePreview ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={form.imagePreview} alt="preview" className="w-24 h-24 object-cover rounded-xl" />
                      <p className="text-xs text-gray-400" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <p className="text-xs" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>Click to upload image (optional)</p>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold tracking-widest uppercase text-gray-500 hover:bg-gray-50 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl bg-[#0b0b0b] hover:bg-[#9a2a2a] text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {submitting && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {editTarget ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
