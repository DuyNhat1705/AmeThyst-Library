'use client';

import React, { useState, useEffect } from 'react';
import ImageUploader from '../ui/ImageUploader';

const LANGUAGE_OPTIONS = [
  { value: 'eng', label: 'English (eng)' },
  { value: 'vie', label: 'Vietnamese (vie)' },
  { value: 'fre', label: 'French (fre)' },
  { value: 'ger', label: 'German (ger)' },
  { value: 'jpn', label: 'Japanese (jpn)' },
  { value: 'zho', label: 'Chinese (zho)' },
];

const BOOK_FORMAT_OPTIONS = [
  { value: 'Paperback', label: 'Paperback' },
  { value: 'Hardcover', label: 'Hardcover' },
  { value: 'Mass Market Paperback', label: 'Mass Market Paperback' },
  { value: 'E-book', label: 'E-book' },
  { value: 'Audiobook', label: 'Audiobook' },
];

export default function BookEditModal({ isOpen, onClose, onSuccess, book, branches }) {
  const [formData, setFormData] = useState({
    title: '',
    original_title: '',
    description: '',
    isbn: '',
    author: '',
    publisher: '',
    publication_date: '',
    price: '',
    num_pages: '',
    language_code: 'eng',
    book_format: 'Paperback',
    genres: '',
    image_url: ''
  });

  const [stockInputs, setStockInputs] = useState({});
  const [availInputs, setAvailInputs] = useState({});
  const [shelfNumberInputs, setShelfNumberInputs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const activeBranches = (branches && branches.length > 0)
    ? branches
    : [
        { branch_id: 1, name: 'Nguyen Van Cu', name_short: 'NVC' },
        { branch_id: 2, name: 'Thu Duc', name_short: 'TD' }
      ];

  // Freeze outer page scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        original_title: book.original_title || '',
        description: book.description || '',
        isbn: book.isbn || '',
        author: Array.isArray(book.author) ? book.author.join(', ') : (book.author || ''),
        publisher: book.publisher || '',
        publication_date: book.publication_date ? new Date(book.publication_date).toISOString().split('T')[0] : '',
        price: book.price !== undefined ? book.price : '',
        num_pages: book.num_pages !== undefined ? book.num_pages : '',
        language_code: book.language_code || 'eng',
        book_format: book.book_format || 'Paperback',
        genres: Array.isArray(book.genres) ? book.genres.join(', ') : (book.genres || ''),
        image_url: book.image_url || ''
      });

      const initialStock = {};
      const initialAvail = {};
      const initialShelf = {};

      const dbStocks = book.branch_stocks || book.inventory || [];
      if (Array.isArray(dbStocks)) {
        dbStocks.forEach((s) => {
          const bId = s.branch_id || s.branchId;
          if (bId) {
            initialStock[bId] = s.quantity !== undefined ? s.quantity : 0;
            initialAvail[bId] = s.available_quantity !== undefined ? s.available_quantity : (s.availableCopies || initialStock[bId]);
            initialShelf[bId] = (s.shelf || '').replace(/\D/g, '').slice(0, 3) || '91';
          }
        });
      }

      activeBranches.forEach((b) => {
        if (initialStock[b.branch_id] === undefined) {
          initialStock[b.branch_id] = 0;
          initialAvail[b.branch_id] = 0;
          initialShelf[b.branch_id] = '91';
        }
      });

      setStockInputs(initialStock);
      setAvailInputs(initialAvail);
      setShelfNumberInputs(initialShelf);
    }
  }, [book, branches]);

  const computeTitleFirstLetter = (t) => {
    const trimmed = (t || '').replace(/^["'“`{\[\(\s]+/, '').trim();
    if (trimmed.length > 0) {
      return trimmed.charAt(0).toUpperCase();
    }
    return 'B';
  };

  const currentTitleLetter = computeTitleFirstLetter(formData.title);

  if (!isOpen || !book) return null;

  const handleStockChange = (branchId, value) => {
    const newQty = Math.max(0, parseInt(value || 0, 10));
    const currentAvail = availInputs[branchId] !== undefined ? availInputs[branchId] : newQty;
    const clampedAvail = Math.min(newQty, currentAvail);

    setStockInputs((prev) => ({ ...prev, [branchId]: newQty }));
    setAvailInputs((prev) => ({ ...prev, [branchId]: clampedAvail }));
  };

  const handleAvailChange = (branchId, value) => {
    const qty = stockInputs[branchId] !== undefined ? parseInt(stockInputs[branchId], 10) : 0;
    const requestedAvail = Math.max(0, parseInt(value || 0, 10));
    const clampedAvail = Math.min(qty, requestedAvail);

    setAvailInputs((prev) => ({ ...prev, [branchId]: clampedAvail }));
  };

  const handleShelfInputChange = (branchId, rawVal) => {
    const digitsOnly = (rawVal || '').replace(/\D/g, '').slice(0, 3);
    setShelfNumberInputs((prev) => ({ ...prev, [branchId]: digitsOnly }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const branch_stocks = activeBranches.map((b) => {
        const qty = parseInt(stockInputs[b.branch_id] || 0, 10);
        const avail = Math.min(qty, parseInt(availInputs[b.branch_id] !== undefined ? availInputs[b.branch_id] : qty, 10));
        const userShelf = (shelfNumberInputs[b.branch_id] || '91').replace(/\D/g, '').slice(0, 3) || '91';
        const shortName = b.name_short || `CS${b.branch_id}`;
        const generatedShelf = `${shortName}.${currentTitleLetter}${userShelf}`;

        return {
          branch_id: b.branch_id,
          quantity: qty,
          available_quantity: avail,
          shelf: generatedShelf,
          user_shelf_number: userShelf
        };
      });

      const payload = {
        ...formData,
        num_pages: formData.num_pages ? parseInt(formData.num_pages, 10) : null,
        price: formData.price ? parseFloat(formData.price) : 0,
        author: formData.author ? formData.author.split(',').map((s) => s.trim()) : [],
        genres: formData.genres ? formData.genres.split(',').map((s) => s.trim()) : [],
        branch_stocks
      };

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_BASE}/api/books/${book.book_id || book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update catalog book.');
      }

      onSuccess();
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Error updating book.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-3xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Edit Book Catalog (ID: {book.book_id || book.id})
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">
            &times;
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-950 dark:text-red-300 rounded-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-sm text-slate-800 dark:text-slate-200">
          {/* Title & ISBN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">ISBN *</label>
              <input
                type="text"
                required
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>
          </div>

          {/* Language & Book Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Language</label>
              <select
                value={formData.language_code}
                onChange={(e) => setFormData({ ...formData, language_code: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Book Format</label>
              <select
                value={formData.book_format}
                onChange={(e) => setFormData({ ...formData, book_format: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
              >
                {BOOK_FORMAT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Authors & Publisher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Authors (comma separated)</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Publisher</label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Pages, Price, Genres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Pages</label>
              <input
                type="number"
                value={formData.num_pages}
                onChange={(e) => setFormData({ ...formData, num_pages: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Genres (comma separated)</label>
              <input
                type="text"
                value={formData.genres}
                onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <ImageUploader
              label="Book Cover Image"
              currentUrl={formData.image_url}
              onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Branch Physical Stock Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Branch Physical Stock & Bookshelf Location Configuration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Auto-generated location format: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">&apos;[BranchShortName].{currentTitleLetter}[Number]&apos;</span> (e.g., NVC.B91). Max 3 digits for shelf number.
              </p>
            </div>

            <div className="space-y-4">
              {activeBranches.map((b) => {
                const shortName = b.name_short || `CS${b.branch_id}`;
                const userShelfNum = (shelfNumberInputs[b.branch_id] !== undefined ? shelfNumberInputs[b.branch_id] : '91').replace(/\D/g, '').slice(0, 3);
                const generatedShelf = `${shortName}.${currentTitleLetter}${userShelfNum || '91'}`;

                const qty = stockInputs[b.branch_id] !== undefined ? stockInputs[b.branch_id] : 0;
                const avail = availInputs[b.branch_id] !== undefined ? availInputs[b.branch_id] : qty;

                return (
                  <div
                    key={b.branch_id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3"
                  >
                    {/* Header: NVC (1) Nguyen Van Cu */}
                    <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700/60">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800">
                          {shortName} ({b.branch_id})
                        </span>
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{b.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800">
                        {generatedShelf}
                      </span>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                      {/* Quantity */}
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                          Quantity:
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={qty}
                          onChange={(e) => handleStockChange(b.branch_id, e.target.value)}
                          className="w-full px-2.5 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100"
                        />
                      </div>

                      {/* Available for lending */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-semibold text-slate-700 dark:text-slate-300">
                            Available for lending:
                          </label>
                        </div>
                        <input
                          type="number"
                          min="0"
                          max={qty}
                          value={avail}
                          onChange={(e) => handleAvailChange(b.branch_id, e.target.value)}
                          className="w-full px-2.5 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 font-mono font-bold text-emerald-600 dark:text-emerald-400"
                        />
                        <span className="text-[10px] text-slate-400 italic block mt-1">(must not exceed Quantity)</span>
                      </div>

                      {/* Shelf Input (Max 3 digits, no hyphen) */}
                      <div>
                        <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                          Shelf Number (max 3 digits):
                        </label>
                        <input
                          type="text"
                          maxLength={3}
                          value={userShelfNum}
                          onChange={(e) => handleShelfInputChange(b.branch_id, e.target.value)}
                          className="w-full px-2.5 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 font-mono text-xs"
                          placeholder="e.g. 91 or 101"
                        />
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
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 shadow-sm"
            >
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
