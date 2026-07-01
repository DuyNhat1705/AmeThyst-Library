"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { useI18n } from '../../providers/I18nProvider';

const SLOT_COUNT = 6;
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type Step = 'pin' | 'details' | 'done';

interface Borrower {
  username: string;
  gender: string;
  phone_number: string;
  email: string;
}

interface Book {
  title: string;
  author: string;
  publisher: string;
  genre: string;
  price: string;
}

interface VerifyData {
  borrowId: number;
  borrower: Borrower;
  book: Book;
}

interface ConfirmData {
  borrowId: number;
  status: string;
  due_date: string;
}

export default function InlinePinVerification() {
  const { t } = useI18n();
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(SLOT_COUNT).fill(null));
  const [digits, setDigits] = useState<string[]>(Array(SLOT_COUNT).fill(''));
  const [activeIndex, setActiveIndex] = useState(-1);
  const [step, setStep] = useState<Step>('pin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<VerifyData | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [step]);

  const focusSlot = useCallback((index: number) => {
    if (index >= 0 && index < SLOT_COUNT) {
      inputRefs.current[index]?.focus();
      setActiveIndex(index);
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    if (!digit) return;
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    if (index < SLOT_COUNT - 1) {
      focusSlot(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      } else if (index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        focusSlot(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusSlot(index - 1);
    } else if (e.key === 'ArrowRight' && index < SLOT_COUNT - 1) {
      focusSlot(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, SLOT_COUNT);
    if (pasted) {
      const newDigits = pasted.split('');
      while (newDigits.length < SLOT_COUNT) newDigits.push('');
      setDigits(newDigits);
      focusSlot(Math.min(pasted.length, SLOT_COUNT - 1));
    }
  };

  const getToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  };

  const handleVerify = async () => {
    const pin = digits.join('');
    console.log('[loan-flow] === handleVerify ===');
    console.log('[loan-flow] PIN entered:', pin);
    if (pin.length !== SLOT_COUNT) {
      console.log('[loan-flow] PIN incomplete, returning');
      return;
    }

    const token = getToken();
    if (!token) {
      console.log('[loan-flow] No token found');
      setError('Please sign in');
      return;
    }
    console.log('[loan-flow] Token found, making API call');

    setLoading(true);
    setError(null);

    try {
      const url = `${API_URL}/api/library/verify-pin`;
      console.log('[loan-flow] POST', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ pin }),
      });
      console.log('[loan-flow] Response status:', response.status);

      const data = await response.json();
      console.log('[loan-flow] Response body:', JSON.stringify(data, null, 2));

      if (!response.ok || !data.success) {
        console.log('[loan-flow] Verification failed:', data.message);
        setError(data.message || 'PIN verification failed');
        return;
      }

      console.log('[loan-flow] Verification succeeded, data:', JSON.stringify(data.data, null, 2));
      setVerifiedData(data.data);
      setStep('details');
    } catch (err) {
      console.error('[loan-flow] Network error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmLoan = async () => {
    console.log('[loan-flow] === handleConfirmLoan ===');
    if (!verifiedData) {
      console.log('[loan-flow] No verified data, returning');
      return;
    }
    console.log('[loan-flow] borrow_id:', verifiedData.borrowId);

    const token = getToken();
    if (!token) {
      console.log('[loan-flow] No token found');
      setError('Please sign in');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_URL}/api/library/confirm-loan`;
      console.log('[loan-flow] POST', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ borrow_id: verifiedData.borrowId }),
      });
      console.log('[loan-flow] Response status:', response.status);

      const data = await response.json();
      console.log('[loan-flow] Response body:', JSON.stringify(data, null, 2));

      if (!response.ok || !data.success) {
        console.log('[loan-flow] Confirm failed:', data.message);
        setError(data.message || 'Loan confirmation failed');
        return;
      }

      console.log('[loan-flow] Loan confirmed, due_date:', data.data.due_date);
      setResultMessage(`Loan confirmed. Due date: ${new Date(data.data.due_date).toLocaleDateString()}`);
      setStep('done');
    } catch (err) {
      console.error('[loan-flow] Network error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelLoan = async () => {
    console.log('[loan-flow] === handleCancelLoan ===');
    if (!verifiedData) {
      console.log('[loan-flow] No verified data, returning');
      return;
    }
    console.log('[loan-flow] borrow_id:', verifiedData.borrowId);

    const token = getToken();
    if (!token) {
      console.log('[loan-flow] No token found');
      setError('Please sign in');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_URL}/api/library/cancel-loan`;
      console.log('[loan-flow] POST', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ borrow_id: verifiedData.borrowId }),
      });
      console.log('[loan-flow] Response status:', response.status);

      const data = await response.json();
      console.log('[loan-flow] Response body:', JSON.stringify(data, null, 2));

      if (!response.ok || !data.success) {
        console.log('[loan-flow] Cancel failed:', data.message);
        setError(data.message || 'Loan cancellation failed');
        return;
      }

      console.log('[loan-flow] Loan cancelled');
      setResultMessage('Loan cancelled. Book returned to inventory.');
      setStep('done');
    } catch (err) {
      console.error('[loan-flow] Network error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDigits(Array(SLOT_COUNT).fill(''));
    setStep('pin');
    setError(null);
    setVerifiedData(null);
    setResultMessage(null);
    focusSlot(0);
  };

  const pinCode = digits.join('');

  if (step === 'done') {
    return (
      <div className="bg-[#F8EFE6] dark:bg-transparent flex items-center justify-center w-full">
        <div className="flex max-w-[896px] flex-col items-center gap-8 w-full">
          <div className="flex p-8 flex-col items-center rounded-xl border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 w-full shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)] dark:shadow-none">
            <div className="flex py-8 px-0 flex-col items-center w-full gap-6">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600 dark:text-green-300">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="text-[#43474D] dark:text-neutral-200 font-hankenGrotesk text-lg font-bold text-center">
                {resultMessage}
              </p>
              <button
                onClick={handleReset}
                className="cursor-pointer flex py-3 px-8 items-center gap-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.1em] hover:opacity-90 transition-opacity"
              >
                Verify Another PIN
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'details' && verifiedData) {
    const { borrower, book } = verifiedData;
    return (
      <div className="bg-[#F8EFE6] dark:bg-transparent flex items-center justify-center w-full">
        <div className="flex max-w-[896px] flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center gap-2 w-full">
            <h1 className="text-[#000] dark:text-neutral-100 font-inter text-[32px] font-bold leading-10 tracking-[0.125em] text-center">
              Borrower Details
            </h1>
          </div>

          <div className="flex p-8 flex-col rounded-xl border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 w-full shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)] dark:shadow-none gap-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-1">NAME</p>
                <p className="text-[#000] dark:text-neutral-100 font-hankenGrotesk text-base font-medium">{borrower.username}</p>
              </div>
              <div>
                <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-1">GENDER</p>
                <p className="text-[#000] dark:text-neutral-100 font-hankenGrotesk text-base font-medium">{borrower.gender || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-1">EMAIL</p>
                <p className="text-[#000] dark:text-neutral-100 font-hankenGrotesk text-base font-medium">{borrower.email}</p>
              </div>
              <div>
                <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-1">PHONE</p>
                <p className="text-[#000] dark:text-neutral-100 font-hankenGrotesk text-base font-medium">{borrower.phone_number || 'N/A'}</p>
              </div>
            </div>

            <div className="border-t border-[#E8E2D5] dark:border-neutral-700 pt-6">
              <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-3">BOOK DETAILS</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-1">TITLE</p>
                  <p className="text-[#000] dark:text-neutral-100 font-hankenGrotesk text-base font-medium">{book.title}</p>
                </div>
                <div>
                  <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-1">AUTHOR</p>
                  <p className="text-[#000] dark:text-neutral-100 font-hankenGrotesk text-base font-medium">{book.author}</p>
                </div>
                <div>
                  <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-1">PUBLISHER</p>
                  <p className="text-[#000] dark:text-neutral-100 font-hankenGrotesk text-base font-medium">{book.publisher}</p>
                </div>
                <div>
                  <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em] mb-1">GENRE</p>
                  <p className="text-[#000] dark:text-neutral-100 font-hankenGrotesk text-base font-medium">{book.genre}</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="flex justify-center items-start gap-4 w-full">
              <button
                onClick={handleConfirmLoan}
                disabled={loading}
                className="cursor-pointer flex py-3 px-12 items-center gap-2 rounded-full bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <span className="text-white font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.1em]">
                  {loading ? 'Processing...' : 'Confirm Loan'}
                </span>
              </button>

              <button
                onClick={handleCancelLoan}
                disabled={loading}
                className="cursor-pointer flex py-3 px-12 items-center gap-2 rounded-full bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <span className="text-white font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.1em]">
                  {loading ? 'Processing...' : 'Cancel Loan'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8EFE6] dark:bg-transparent flex items-center justify-center w-full">
      <div className="flex max-w-[896px] flex-col items-center gap-8 w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-[#000] dark:text-neutral-100 font-inter text-[32px] font-bold leading-10 tracking-[0.125em] text-center">
            {t('verification.page_title')}
          </h1>
        </div>

        <div className="flex p-8 flex-col items-start rounded-xl border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 w-full shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)] dark:shadow-none">
          <div className="flex py-8 px-0 flex-col items-center w-full">
            <div className="flex pb-8 flex-col items-start w-fit">
              <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em]">
                {t('verification.enter_code_label')}
              </p>
            </div>

            <div className="flex pb-12 flex-col items-start w-fit" onPaste={handlePaste}>
              <div className="flex items-start gap-4 w-fit">
                {digits.slice(0, 3).map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onFocus={() => setActiveIndex(i)}
                    onBlur={() => setActiveIndex(-1)}
                    autoComplete="one-time-code"
                    disabled={loading}
                    className={`w-16 h-20 rounded-lg border-2 text-center text-2xl font-mono font-bold outline-none transition-colors
                      ${activeIndex === i
                        ? 'border-amber-500 dark:border-amber-400 ring-1 ring-amber-500'
                        : 'border-[#E8E2D5] dark:border-neutral-600'
                      }
                      bg-[#FEF9EF] dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100
                      [&::-webkit-inner-spin-button]:appearance-none
                      [&::-webkit-outer-spin-button]:appearance-none
                    `}
                    aria-label={`Digit ${i + 1}`}
                  />
                ))}
                <div className="w-4" />
                {digits.slice(3).map((d, i) => {
                  const idx = i + 3;
                  return (
                    <input
                      key={idx}
                      ref={(el) => { inputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      onFocus={() => setActiveIndex(idx)}
                      onBlur={() => setActiveIndex(-1)}
                      autoComplete="one-time-code"
                      disabled={loading}
                      className={`w-16 h-20 rounded-lg border-2 text-center text-2xl font-mono font-bold outline-none transition-colors
                        ${activeIndex === idx
                          ? 'border-amber-500 dark:border-amber-400 ring-1 ring-amber-500'
                          : 'border-[#E8E2D5] dark:border-neutral-600'
                        }
                        bg-[#FEF9EF] dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100
                        [&::-webkit-inner-spin-button]:appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                      `}
                      aria-label={`Digit ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="pb-6 w-full">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium text-center">{error}</p>
                </div>
              </div>
            )}

            <div className="flex justify-center items-start gap-4 w-full">
              <button
                onClick={handleVerify}
                disabled={pinCode.length !== SLOT_COUNT || loading}
                className="cursor-pointer flex py-3 px-12 items-center gap-2 rounded-full bg-black dark:bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-center">
                  <path d="M4.05417 7.90417L7.35 4.60833L6.51875 3.77708L4.05417 6.24167L2.82917 5.01667L1.99792 5.84792L4.05417 7.90417ZM4.66667 11.6667C3.31528 11.3264 2.19965 10.551 1.31979 9.34062C0.439931 8.13021 0 6.78611 0 5.30833V1.75L4.66667 0L9.33333 1.75V5.30833C9.33333 6.78611 8.8934 8.13021 8.01354 9.34062C7.13368 10.551 6.01806 11.3264 4.66667 11.6667ZM4.66667 10.4417C5.67778 10.1208 6.51389 9.47917 7.175 8.51667C7.83611 7.55417 8.16667 6.48472 8.16667 5.30833V2.55208L4.66667 1.23958L1.16667 2.55208V5.30833C1.16667 6.48472 1.49722 7.55417 2.15833 8.51667C2.81944 9.47917 3.65556 10.1208 4.66667 10.4417Z" fill="white" className="dark:fill-black" />
                </svg>
                <span className="text-white dark:text-black font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.1em]">
                  {loading ? 'Verifying...' : t('verification.verify_button')}
                </span>
              </button>

              <button
                onClick={handleReset}
                disabled={loading}
                className="cursor-pointer flex py-3.5 px-8 flex-col justify-center items-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <span className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.1em]">
                  {t('verification.clear_button')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
