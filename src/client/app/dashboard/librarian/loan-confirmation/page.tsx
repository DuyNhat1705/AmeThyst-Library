"use client";

import { BookLoanConfirmationPanel } from '../../../components/organisms';

export default function LoanConfirmationPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[#1A2E44] dark:text-neutral-100 font-hankenGrotesk">
        Book Loan Confirmation
      </h1>
      <BookLoanConfirmationPanel />
    </div>
  );
}
