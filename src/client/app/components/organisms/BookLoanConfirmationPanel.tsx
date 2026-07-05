"use client";

import { useState } from 'react';
import { useI18n } from '../../providers/I18nProvider';
import { Toast } from '../atoms';
import VerificationModal from './VerificationModal';
import type { BorrowerInfo } from '../molecules/BorrowerInfoPanel';

export default function BookLoanConfirmationPanel() {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const handleConfirm = (borrowerData: BorrowerInfo) => {
    setToast({
      message: t('verification.toast_success', { name: borrowerData.fullName }),
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md">
        {t('verification.placeholder_empty')}
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-8 py-3 text-base font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        {t('verification.modal_title')}
      </button>

      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
