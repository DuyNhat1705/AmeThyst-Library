'use client';

import React, { useState, useEffect } from 'react';
import ImageUploader from '../ui/ImageUploader';

export default function BookFormModal({ isOpen, onClose, onSuccess, branches }) {
  const [formData, setFormData] = useState({
    title: '',
    original_title: '',
    description: '',
    isbn: '',
    author: '',
    publisher: '',
    publication_date: '',
    num_pages: '',
    price: '',
    language_code: 'eng',
    book_format: 'Paperback',
    genres: '',
    image_url: '',
    branch_stocks: []
  });

  const [stockInputs, setStockInputs] = useState({});
  const [shelfNumberInputs, setShelfNumberInputs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (branches && branches.length > 0) {
      const initialStock = {};
      const initialShelf = {};
      branches.forEach((b) => {
        initialStock[b.branch_id] = 0;
        initialShelf[b.branch_id] = '101';
      });
      setStockInputs(initialStock);
      setShelfNumberInputs(initialShelf);
    }
  }, [branches]);

  // Compute live bookshelf prefix based on title rule
  const computePrefix = (t) => {
    const trimmed = (t || '').trim();
    if (trimmed.length > 0 && /^[a-zA-Z]$/.test(trimmed.charAt(0))) {
      return trimmed.charAt(0).toUpperCase();
    }
    return 'X';
  };

  const currentPrefix = computePrefix(formData.title);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title.trim() || !formData.isbn.trim()) {
      setErrorMsg('Book Title and ISBN are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build branch_stocks array
      const branch_stocks = branches
        .map((b) => ({
          branch_id: b.branch_id,
          quantity: parseInt(stockInputs[b.branch_id] || 0, 10),
          user_shelf_number: shelfNumberInputs[b.branch_id] || '101'
        }))
        .filter((s) => s.quantity > 0);

      const payload = {
        ...formData,
        num_pages: formData.num_pages ? parseInt(formData.num_pages, 10) : null,
        price: formData.price ? parseFloat(formData.price) : 0,
        author: formData.author ? formData.author.split(',').map((s) => s.trim()) : [],
        genres: formData.genres ? formData.genres.split(',').map((s) => s.trim()) : [],
        branch_stocks
      };

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_BASE}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create catalog book.');
      }

      onSuccess();
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Error saving book.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Catalog New Book</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">
            &times;
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-950 dark:text-red-300 rounded-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-slate-800 dark:text-slate-200">
          {/* Title & Original Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Harry Potter and the Sorcerer's Stone"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Original Title</label>
              <input
                type="text"
                value={formData.original_title}
                onChange={(e) => setFormData({ ...formData, original_title: e.target.value })}
                placeholder="e.g. Harry Potter 1"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* ISBN & Authors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">ISBN *</label>
              <input
                type="text"
                required
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                placeholder="e.g. 9780590353427"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Authors (comma separated)</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="e.g. J.K. Rowling, Mary GrandPré"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Publisher & Publication Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Publisher</label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                placeholder="e.g. Scholastic"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Publication Date</label>
              <input
                type="date"
                value={formData.publication_date}
                onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Pages, Price, Genres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Pages</label>
              <input
                type="number"
                value={formData.num_pages}
                onChange={(e) => setFormData({ ...formData, num_pages: e.target.value })}
                placeholder="309"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="19.99"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Genres (comma separated)</label>
              <input
                type="text"
                value={formData.genres}
                onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
                placeholder="Fantasy, Fiction"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Cover Image Upload (Device & URL) */}
          <div>
            <ImageUploader
              label="Book Cover Image"
              currentUrl={formData.image_url}
              onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              placeholder="Book summary or description..."
            />
          </div>

          {/* Branch Stocks & Bookshelf Code Generation */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Branch Physical Stock & Bookshelf Code
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Bookshelf location auto-generates prefix <span className="font-bold text-indigo-600 dark:text-indigo-400">&apos;{currentPrefix}&apos;</span> from title first character.
            </p>

            <div className="space-y-3">
              {(branches || []).map((b) => {
                const shelfCode = `${currentPrefix}${shelfNumberInputs[b.branch_id] || '101'}`;
                return (
                  <div
                    key={b.branch_id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{b.name}</span>{' '}
                      <span className="text-xs text-slate-500">({b.name_short})</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div>
                        <label className="text-xs text-slate-500 block">Quantity</label>
                        <input
                          type="number"
                          min="0"
                          value={stockInputs[b.branch_id] !== undefined ? stockInputs[b.branch_id] : 0}
                          onChange={(e) =>
                            setStockInputs({ ...stockInputs, [b.branch_id]: e.target.value })
                          }
                          className="w-20 px-2 py-1 border rounded dark:bg-slate-800 dark:border-slate-700"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-500 block">Shelf Number</label>
                        <input
                          type="text"
                          value={shelfNumberInputs[b.branch_id] || '101'}
                          onChange={(e) =>
                            setShelfNumberInputs({
                              ...shelfNumberInputs,
                              [b.branch_id]: e.target.value
                            })
                          }
                          className="w-24 px-2 py-1 border rounded dark:bg-slate-800 dark:border-slate-700"
                        />
                      </div>

                      <div className="text-xs">
                        <span className="text-slate-500 block">Generated Location</span>
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-1 rounded">
                          {shelfCode}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Create Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
