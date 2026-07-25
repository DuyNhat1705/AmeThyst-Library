"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '../../providers/I18nProvider';

interface PickupRecord {
  borrow_id: string;
  user_id: string;
  book_id: string;
  branch_id: number;
  reserve_date: string;
  borrow_date?: string;
  due_date?: string;
  pin?: string;
  expired_at?: string;
  status: string;
  book_title: string;
  book_isbn: string;
  book_image_url?: string;
  username: string;
  email: string;
  avatar?: string;
  branch_name: string;
  name_short: string;
}

const ITEMS_PER_PAGE = 10;

function getInitials(name: string): string {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function formatExpiresTime(expiresAt?: string): { display: string; urgent: boolean; expired: boolean } {
  if (!expiresAt) return { display: 'N/A', urgent: false, expired: false };
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { display: 'Expired', urgent: true, expired: true };
  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return { display: `${hours}h ${minutes}m`, urgent: hours < 2, expired: false };
  }
  const seconds = Math.floor((diff % 60000) / 1000);
  return { display: `${minutes}m ${seconds}s`, urgent: true, expired: false };
}

export default function BookPickupTab() {
  const { t } = useI18n();
  const [pickups, setPickups] = useState<PickupRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Pin verification state
  const [selectedPickupForPin, setSelectedPickupForPin] = useState<PickupRecord | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchPickups = async () => {
    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_BASE}/dashboard/librarian/pickups`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setPickups(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch pickups:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const handleConfirmBorrow = async (borrowId: string) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_BASE}/dashboard/librarian/confirm-borrowing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ borrow_id: borrowId })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to confirm borrowing');
      }
      fetchPickups();
    } catch (err: any) {
      alert(err.message || 'Error confirming borrowing');
    }
  };

  const handleCancelBorrow = async (borrowId: string) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_BASE}/dashboard/librarian/cancel-borrowing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ borrow_id: borrowId })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to cancel reservation');
      }
      fetchPickups();
    } catch (err: any) {
      alert(err.message || 'Error cancelling reservation');
    }
  };

  const handleVerifyPinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    setIsVerifying(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API_BASE}/dashboard/librarian/verify-pin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ pin: pinInput })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'PIN Verification failed');
      }

      // Auto-confirm borrowing after successful PIN verification
      if (data.data?.borrowId) {
        await handleConfirmBorrow(data.data.borrowId);
      } else if (selectedPickupForPin) {
        await handleConfirmBorrow(selectedPickupForPin.borrow_id);
      }

      setSelectedPickupForPin(null);
      setPinInput('');
    } catch (err: any) {
      setPinError(err.message || 'Verification error');
    } finally {
      setIsVerifying(false);
    }
  };

  // KPI Metrics
  const pendingCount = useMemo(() => pickups.filter(p => p.status === 'reserved' || p.status === 'pending').length, [pickups]);
  const expiredCount = useMemo(() => pickups.filter(p => p.status === 'expired' || (p.expired_at && new Date(p.expired_at).getTime() <= Date.now())).length, [pickups]);
  const confirmedCount = useMemo(() => pickups.filter(p => p.status === 'borrowed').length, [pickups]);

  // Filtered records
  const filteredPickups = useMemo(() => {
    if (!searchQuery.trim()) return pickups;
    const q = searchQuery.toLowerCase().trim();
    return pickups.filter(p =>
      (p.book_title || '').toLowerCase().includes(q) ||
      (p.book_isbn || '').toLowerCase().includes(q) ||
      (p.username || '').toLowerCase().includes(q) ||
      (p.email || '').toLowerCase().includes(q)
    );
  }, [pickups, searchQuery]);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredPickups.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filteredPickups.length / ITEMS_PER_PAGE));

  return (
    <div className="flex py-4 px-2 md:px-4 flex-col items-start gap-6 w-full animate-fadeIn text-slate-800 dark:text-slate-100">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="flex p-6 flex-col items-start gap-1 border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm rounded-xl">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-neutral-700 text-indigo-600 dark:text-indigo-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
              Active Reservations
            </span>
          </div>
          <p className="text-2xl font-bold font-hankenGrotesk mt-2">{pendingCount}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('librarian.kpi_pending_pickups')}</p>
        </div>

        <div className="flex p-6 flex-col items-start gap-1 border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm rounded-xl">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-wider text-red-600 dark:text-red-400 uppercase">
              Expired
            </span>
          </div>
          <p className="text-2xl font-bold font-hankenGrotesk mt-2">{expiredCount}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('librarian.kpi_expired_today')}</p>
        </div>

        <div className="flex p-6 flex-col items-start gap-1 border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm rounded-xl">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-wider text-teal-600 dark:text-teal-400 uppercase">
              Borrowed
            </span>
          </div>
          <p className="text-2xl font-bold font-hankenGrotesk mt-2">{confirmedCount}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('librarian.kpi_redeemed_today')}</p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex p-3 items-center gap-4 rounded-xl bg-slate-100 dark:bg-neutral-800 w-full">
        <div className="flex flex-col items-start w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by title, ISBN, user name, or email..."
            className="flex py-2 pr-4 pb-2 pl-10 items-center rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 w-full text-sm font-manrope text-slate-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-2.5 text-slate-400">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex flex-col rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm w-full overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center border-b border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 py-3.5 px-6 font-bold text-xs text-slate-600 dark:text-neutral-300 font-hankenGrotesk tracking-wider uppercase w-full">
          <div className="flex-1 min-w-[280px] text-left">{t('librarian.pickup_book_details')}</div>
          <div className="w-[240px] text-left">{t('librarian.pickup_user')}</div>
          <div className="w-[150px] text-left">{t('librarian.pickup_reserve_date')}</div>
          <div className="w-[130px] text-left">{t('librarian.pickup_branch')}</div>
          <div className="w-[200px] text-left">{t('librarian.pickup_pin')}</div>
          <div className="w-[150px] text-right">{t('librarian.pickup_actions')}</div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="py-16 text-center text-slate-500 font-inter text-base animate-pulse">
            Loading pickup records from PostgreSQL borrow_book table...
          </div>
        ) : pageItems.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-neutral-400 font-manrope text-sm">
            No pickup or reservation records found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-neutral-700 w-full">
            {pageItems.map((item) => {
              const initials = getInitials(item.username);
              const expires = formatExpiresTime(item.expired_at);
              const isConfirmed = item.status === 'borrowed';

              return (
                <div key={item.borrow_id} className="flex items-center py-4 px-6 text-sm font-manrope hover:bg-slate-50/50 dark:hover:bg-neutral-700/50 transition-colors w-full">
                  {/* Book Details: Title & ISBN */}
                  <div className="flex-1 min-w-[280px] flex items-center gap-3 pr-4">
                    <div className="w-10 h-14 bg-slate-100 dark:bg-neutral-700 rounded overflow-hidden shrink-0 border border-slate-200 dark:border-neutral-600">
                      {item.book_image_url ? (
                        <img src={item.book_image_url} alt={item.book_title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Book</div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100 leading-tight line-clamp-2">{item.book_title}</p>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">ISBN: {item.book_isbn}</p>
                    </div>
                  </div>

                  {/* User: Name & Email from public.users */}
                  <div className="w-[240px] flex items-center gap-3 pr-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{item.username}</p>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">{item.email}</p>
                    </div>
                  </div>

                  {/* Reserve Date */}
                  <div className="w-[150px] text-slate-700 dark:text-neutral-300 font-mono text-xs">
                    {item.reserve_date ? new Date(item.reserve_date).toLocaleDateString() : 'N/A'}
                  </div>

                  {/* Branch Short Name */}
                  <div className="w-[130px]">
                    <span className="font-mono font-bold text-xs bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded border border-indigo-200 dark:border-indigo-800">
                      {item.name_short}
                    </span>
                  </div>

                  {/* PIN & Expiry: Icon-only clickable PIN with expiration time */}
                  <div className="w-[200px] flex items-center gap-2.5">
                    {/* Clickable Green Tick / PIN Icon for Verification */}
                    <button
                      onClick={() => {
                        setSelectedPickupForPin(item);
                        setPinInput(item.pin || '');
                        setPinError('');
                      }}
                      className={`p-2 rounded-full transition-transform hover:scale-110 shadow-sm ${
                        isConfirmed
                          ? 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                          : expires.expired
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 cursor-pointer'
                      }`}
                      title={isConfirmed ? 'Borrowing Confirmed' : `Click to verify PIN (${item.pin || '6-digit code'})`}
                    >
                      {isConfirmed || !expires.expired ? (
                        /* Green Tick Checkmark Icon */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        /* Lock / Alert Icon for Expired */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      )}
                    </button>

                    {/* Expire Time Display */}
                    <div className="flex flex-col">
                      <span className={`text-xs font-mono font-semibold ${
                        expires.expired ? 'text-red-600 dark:text-red-400' : expires.urgent ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {expires.display}
                      </span>
                      {item.pin && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          PIN: {item.pin}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions: Confirm / Cancel */}
                  <div className="w-[150px] flex items-center justify-end gap-2">
                    {!isConfirmed && (
                      <>
                        <button
                          onClick={() => handleConfirmBorrow(item.borrow_id)}
                          className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors"
                          title="Confirm Borrowing"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleCancelBorrow(item.borrow_id)}
                          className="px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                          title="Cancel Reservation"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {isConfirmed && (
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                        Handed Out
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table Pagination */}
        <div className="flex py-4 px-6 justify-between items-center bg-slate-50 dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-700">
          <p className="text-xs text-slate-500 font-medium">
            Showing {startIdx + 1}-{Math.min(startIdx + ITEMS_PER_PAGE, filteredPickups.length)} of {filteredPickups.length} records
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 text-xs font-semibold rounded bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-xs font-bold px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 text-xs font-semibold rounded bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* PIN Verification Interactive Modal */}
      {selectedPickupForPin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Verify Pickup PIN
              </h3>
              <button
                onClick={() => setSelectedPickupForPin(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            {pinError && (
              <div className="p-3 text-xs text-red-700 bg-red-100 dark:bg-red-950 dark:text-red-300 rounded-md">
                {pinError}
              </div>
            )}

            <form onSubmit={handleVerifyPinSubmit} className="space-y-4">
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  User: <strong className="text-slate-900 dark:text-slate-100">{selectedPickupForPin.username}</strong> ({selectedPickupForPin.email})
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Book: <strong className="text-slate-900 dark:text-slate-100">{selectedPickupForPin.book_title}</strong>
                </p>

                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Enter 6-digit Pickup PIN
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="e.g. 123456"
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-center font-mono text-lg font-bold tracking-widest text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedPickupForPin(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors disabled:opacity-50"
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Hand Out'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
