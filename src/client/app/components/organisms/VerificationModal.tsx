"use client";

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../../providers/I18nProvider';
import { OTPInput } from '../atoms';
import BorrowerInfoPanel from '../molecules/BorrowerInfoPanel';
import type { BorrowerInfo, BookInfo } from '../molecules/BorrowerInfoPanel';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (borrowerData: BorrowerInfo) => void;
}

const MOCK_BORROWER: BorrowerInfo = {
  fullName: 'Nguyen Nhut Huy',
  libraryId: '2212XXXX',
  department: 'Computer Science',
  eligibility: 'eligible',
};

const MOCK_BOOKS: BookInfo[] = [
  { title: 'Data Structures & Algorithms', author: 'Thomas H. Cormen', bookCode: 'KHMT-012', coverUrl: null },
  { title: 'Introduction to AI', author: 'Stuart Russell', bookCode: 'KHMT-099', coverUrl: null },
];

type ModalPhase = 'input' | 'loading' | 'data' | 'error';

export default function VerificationModal({ isOpen, onClose, onConfirm }: VerificationModalProps) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<ModalPhase>('input');
  const [pinValue, setPinValue] = useState('');
  const [borrowerData] = useState<BorrowerInfo>(MOCK_BORROWER);
  const [booksData] = useState<BookInfo[]>(MOCK_BOOKS);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (isOpen) {
      setPhase('input');
      setPinValue('');
      setErrorMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handlePinComplete = useCallback((value: string) => {
    setPhase('loading');
    setErrorMessage('');
    setTimeout(() => {
      if (value === '000000') {
        setPhase('error');
        setErrorMessage(t('verification.error_invalid_pin'));
      } else {
        setPhase('data');
      }
    }, 800);
  }, [t]);

  const handleConfirm = useCallback(() => {
    onConfirm(borrowerData);
    onClose();
  }, [onConfirm, onClose, borrowerData]);

  const handleRetry = useCallback(() => {
    setPhase('input');
    setPinValue('');
    setErrorMessage('');
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Enter' && phase === 'input' && pinValue.length === 6) {
        handlePinComplete(pinValue);
      }
      if ((e.key === 'F8' || (e.ctrlKey && e.key === 'Enter')) && phase === 'data') {
        e.preventDefault();
        handleConfirm();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, phase, pinValue, onClose, handlePinComplete, handleConfirm]);

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[#F8EFE6] dark:bg-[#1E293B] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-[#F8EFE6] dark:bg-[#1E293B] px-6 py-4 border-b border-[#E8E2D5] dark:border-neutral-700 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-hankenGrotesk">
            {t('verification.modal_title')}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-xl leading-none p-1"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {(phase === 'input' || phase === 'error') && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 text-center">
                {t('verification.pin_label')}
              </p>
              <OTPInput
                value={pinValue}
                onChange={(v) => { setPinValue(v); setErrorMessage(''); }}
                onComplete={handlePinComplete}
                error={phase === 'error'}
                autoFocus
              />
              {phase === 'error' && (
                <p className="text-sm text-red-500 dark:text-red-400 text-center">
                  {errorMessage}
                </p>
              )}
              <div className="flex justify-center">
                <button
                  onClick={() => pinValue.length === 6 && handlePinComplete(pinValue)}
                  disabled={pinValue.length !== 6}
                  className="px-6 py-2 text-sm font-semibold text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {t('verification.search_button')}
                </button>
              </div>
            </div>
          )}

          {phase === 'loading' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                {t('verification.skeleton_loading')}
              </p>
              <BorrowerInfoPanel borrower={MOCK_BORROWER} books={MOCK_BOOKS} isLoading />
            </div>
          )}

          {phase === 'data' && (
            <div className="space-y-4">
              <div className="border-b border-[#E8E2D5] dark:border-neutral-700 pb-3">
                <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  {t('verification.phase_data_header')}
                </p>
              </div>
              <BorrowerInfoPanel borrower={borrowerData} books={booksData} />
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-[#F8EFE6] dark:bg-[#1E293B] px-6 py-4 border-t border-[#E8E2D5] dark:border-neutral-700 rounded-b-2xl flex items-center justify-between">
          <div className="flex gap-3 text-xs text-neutral-400 dark:text-neutral-500">
            <span>{t('verification.shortcut_esc')}</span>
            {phase === 'input' && <span>{t('verification.shortcut_enter')}</span>}
            {phase === 'data' && <span>{t('verification.shortcut_confirm')}</span>}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              {t('verification.cancel_button')}
            </button>
            {phase === 'data' && (
              <button
                onClick={handleConfirm}
                className="px-5 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                {t('verification.confirm_button')}
              </button>
            )}
            {phase === 'error' && (
              <button
                onClick={handleRetry}
                className="px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
