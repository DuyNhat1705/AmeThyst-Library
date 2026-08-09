"use client";

import React from "react";

interface ModalShellProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeLabel?: string;
}

export default function ModalShell({
  title,
  onClose,
  children,
  footer,
  closeLabel,
}: ModalShellProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-neutral-800 border-2 border-neutral-800 dark:border-neutral-700 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#F8F3E9] dark:bg-neutral-700 border-b border-neutral-300 dark:border-neutral-600 p-4 flex justify-between items-center">
          <h3 className="font-manrope text-sm font-black text-neutral-800 dark:text-neutral-100 uppercase tracking-wider">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-full text-neutral-500 dark:text-neutral-300 transition-colors cursor-pointer"
            aria-label={closeLabel || "Close modal"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="bg-neutral-50 dark:bg-neutral-700 p-4 border-t border-neutral-200 dark:border-neutral-600 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
