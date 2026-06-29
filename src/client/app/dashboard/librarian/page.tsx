import { CalendarView } from '../../components/molecules';

export default function LibrarianCalendarPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[#1A2E44] dark:text-neutral-100 font-hankenGrotesk">
        Calendar View
      </h1>
      <CalendarView />
    </div>
  );
}
