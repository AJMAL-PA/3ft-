import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { attributeService } from '../../services/attributeService';

const emptyForm = { name: '', valuesText: '' };

export default function AttributeManager() {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchAttributes = async () => {
    try {
      const res = await attributeService.getAll();
      setAttributes(res.data.data || []);
    } catch {
      toast.error('Failed to load attributes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (attr) => {
    setEditTarget(attr);
    setForm({
      name: attr.name,
      valuesText: attr.values.join(', '),
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Attribute name is required');
      return;
    }
    if (!form.valuesText.trim()) {
      toast.error('At least one value is required');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        values: form.valuesText.split(',').map((v) => v.trim()).filter(Boolean),
      };

      if (editTarget) {
        await attributeService.update(editTarget._id, payload);
        toast.success('Attribute updated!');
      } else {
        await attributeService.create(payload);
        toast.success('Attribute created!');
      }
      closeModal();
      fetchAttributes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (attr) => {
    if (
      !window.confirm(
        `Delete attribute "${attr.name}"? This will remove it from all products.`
      )
    )
      return;
    try {
      await attributeService.delete(attr._id);
      toast.success('Attribute deleted');
      fetchAttributes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-[10px] text-gray-400 uppercase tracking-widest"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {attributes.length} Attributes Defined
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#0b0b0b] hover:bg-[#9a2a2a] text-white px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Attribute
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-6 h-6 border-2 border-[#9a2a2a]/30 border-t-[#9a2a2a] rounded-full animate-spin" />
          </div>
        ) : attributes.length === 0 ? (
          <div className="py-20 text-center">
            <p
              className="text-gray-400 text-sm mb-4"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              No attributes defined yet.
            </p>
            <button
              onClick={openAdd}
              className="text-[#9a2a2a] text-xs font-bold uppercase tracking-widest hover:underline"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Add your first attribute →
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th
                  className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 w-1/4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Attribute Name
                </th>
                <th
                  className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Values
                </th>
                <th className="px-6 py-4 w-24" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attributes.map((attr) => (
                <tr key={attr._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p
                      className="font-bold text-sm text-[#111] uppercase tracking-wide"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {attr.name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {attr.values.map((v) => (
                        <span
                          key={v}
                          className="bg-gray-50 text-gray-600 border border-gray-150 text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(attr)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#111] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(attr)}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
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
              <h3
                className="font-black text-sm uppercase tracking-[0.2em] text-[#111]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {editTarget ? 'Edit Attribute' : 'Add Attribute'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label
                  className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Attribute Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Size, Color, Material"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-[#9a2a2a] transition-colors"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                />
              </div>
              <div>
                <label
                  className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Attribute Values (Comma Separated) *
                </label>
                <textarea
                  value={form.valuesText}
                  onChange={(e) => setForm({ ...form, valuesText: e.target.value })}
                  placeholder="e.g. S, M, L, XL or Black, White, Cream"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-[#9a2a2a] resize-none transition-colors"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                />
                <p className="text-[10px] text-gray-400 mt-1.5" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                  Separate values with commas. e.g. "S, M, L, XL" or "Black, Olive, Brown"
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold tracking-widest uppercase text-gray-500 hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-[#0b0b0b] hover:bg-[#9a2a2a] text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {submitting && (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
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
