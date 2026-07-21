"use client";

import React from 'react';
import { useI18n } from '../../providers/I18nProvider';
import AvailabilityBadge from '../atoms/AvailabilityBadge';
import StatusDot from '../atoms/StatusDot';
import IconButton from '../atoms/IconButton';
import type { ColumnDef } from './BookTableHeader';

export interface BookEntry {
  id: string;
  coverSrc: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: number;
  total: number;
  active: boolean;
}

interface BookTableRowProps {
  book: BookEntry;
  hasBorder?: boolean;
  columns?: ColumnDef[];
  renderActions?: (book: BookEntry) => React.ReactNode;
}

const DEFAULT_COLUMNS: ColumnDef[] = [
  { key: 'cover', width: 'w-[84px]', align: 'items-start' },
  { key: 'title', width: 'w-[147px]', align: 'items-start' },
  { key: 'author', width: 'w-[103px]', align: 'items-start' },
  { key: 'isbn', width: 'w-[107px]', align: 'items-start' },
  { key: 'category', width: 'w-[142px]', align: 'items-start' },
  { key: 'availability', width: 'w-[126px]', align: 'items-center' },
  { key: 'status', width: 'w-[122px]', align: 'items-start' },
  { key: 'actions', width: 'w-[136px]', align: 'items-end' },
];

export default function BookTableRow({ book, hasBorder = false, columns, renderActions }: BookTableRowProps) {
  const { t } = useI18n();
  const cols = columns ?? DEFAULT_COLUMNS;

  return (
    <div
      className={`flex pr-6 justify-center items-center w-full ${
        hasBorder ? 'border-t border-[#E8E2D5] dark:border-neutral-700' : ''
      }`}
    >
      {cols.map((col) => {
        switch (col.key) {
          case 'cover':
            return (
              <div key={col.key} className={`flex py-[25px] px-6 flex-col items-start ${col.width}`}>
                <img
                  src={book.coverSrc}
                  className="rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-9 h-16 object-cover"
                  alt={book.title}
                />
              </div>
            );
          case 'title':
            return (
              <div key={col.key} className={`flex py-[35px] px-6 flex-col items-start ${col.width}`}>
                <p className="text-[#000] dark:text-neutral-100 font-manrope text-base font-bold">
                  {book.title}
                </p>
              </div>
            );
          case 'author':
            return (
              <div key={col.key} className={`flex py-[35px] px-6 flex-col items-start ${col.width}`}>
                <p className="text-[#1D1C16] dark:text-neutral-300 font-manrope text-base">
                  {book.author}
                </p>
              </div>
            );
          case 'isbn':
            return (
              <div key={col.key} className={`flex py-[17px] px-6 flex-col items-start ${col.width}`}>
                <p className="text-[#1D1C16] dark:text-neutral-300 font-liberationMono text-sm leading-5">
                  {book.isbn}
                </p>
              </div>
            );
          case 'category':
            return (
              <div key={col.key} className={`flex py-[46px] px-6 flex-col items-start ${col.width}`}>
                <p className="text-[#1D1C16] dark:text-neutral-300 font-manrope text-base">
                  {book.category}
                </p>
              </div>
            );
          case 'availability':
            return (
              <div key={col.key} className="flex pl-6 justify-center items-start w-[102px]">
                <AvailabilityBadge available={book.available} total={book.total} />
              </div>
            );
          case 'status':
            return (
              <div key={col.key} className="flex pl-12 items-center gap-2 w-[122px]">
                <StatusDot active={book.active} />
                <p
                  className={`font-manrope text-base ${
                    book.active
                      ? 'text-[#5EEAD4] dark:text-teal-300'
                      : 'text-[#74777D] dark:text-neutral-400'
                  }`}
                >
                  {book.active ? t('librarian.status_active') : t('librarian.status_inactive')}
                </p>
              </div>
            );
          case 'actions':
            return (
              <div key={col.key} className={`flex pl-12 justify-end items-start gap-2 ${col.width}`}>
                {renderActions ? (
                  renderActions(book)
                ) : (
                  <>
                    <IconButton label={t('librarian.edit')}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM16 3.4L14.6 2L16 3.4ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="#43474D" className="dark:fill-neutral-300" />
                      </svg>
                    </IconButton>
                    <IconButton label={t('librarian.delete')}>
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.4125 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14ZM3 3V16V3Z" fill="#BA1A1A" />
                      </svg>
                    </IconButton>
                  </>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
