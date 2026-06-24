"use client";

import { useI18n } from '../../../providers/I18nProvider';
import { mockFees } from '../../../data/mockLoansFees';
import FeesBreakdownPanel from '../../../components/organisms/FeesBreakdownPanel';

export default function LoanFeesPage() {
  const { t } = useI18n();
  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-manrope text-[40px] font-bold leading-[54.5px] text-black dark:text-neutral-100">
          {t('dashboard.loan_fees_title')}
        </h1>
      </div>

      <FeesBreakdownPanel fees={mockFees} />
    </>
  );
}
