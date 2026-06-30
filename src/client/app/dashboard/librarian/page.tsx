import { CalendarView } from '../../components/molecules';

export default function LibrarianCalendarPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-manrope text-[40px] font-bold leading-[54.5px] text-black dark:text-neutral-100">
          Calendar & Overview
        </h1>
      </div>
      <CalendarView />
    </div>
  );
}
