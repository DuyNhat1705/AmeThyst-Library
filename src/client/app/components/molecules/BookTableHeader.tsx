"use client";

import { useI18n } from '../../providers/I18nProvider';

const COLUMNS = [
  { key: 'cover', width: 'w-[84px]', align: 'items-start' as const },
  { key: 'title', width: 'w-[147px]', align: 'items-start' as const },
  { key: 'author', width: 'w-[103px]', align: 'items-start' as const },
  { key: 'isbn', width: 'w-[107px]', align: 'items-start' as const },
  { key: 'category', width: 'w-[142px]', align: 'items-start' as const },
  { key: 'availability', width: 'w-[126px]', align: 'items-center' as const },
  { key: 'status', width: 'w-[122px]', align: 'items-start' as const },
  { key: 'actions', width: 'w-[136px]', align: 'items-end' as const },
];

export default function BookTableHeader() {
  const { t } = useI18n();

  return (
    <div className="flex justify-center items-start border-b border-[#E8E2D5] dark:border-neutral-700 bg-[#F8F3E9] dark:bg-neutral-800 w-full">
      {COLUMNS.map((col) => (
        <div
          key={col.key}
          className={`flex py-4 px-6 flex-col ${col.align} ${col.width}`}
        >
          <p className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.05em]">
            {t(`librarian.table_${col.key}`)}
          </p>
        </div>
      ))}
    </div>
  );
}
