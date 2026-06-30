"use client";

import { BookLoanConfirmationPanel } from '../../../components/organisms';

export default function LoanConfirmationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-manrope text-[40px] font-bold leading-[54.5px] text-black dark:text-neutral-100">
          PIN Verification
        </h1>
      </div>
      <BookLoanConfirmationPanel />
    </div>
  );
}
