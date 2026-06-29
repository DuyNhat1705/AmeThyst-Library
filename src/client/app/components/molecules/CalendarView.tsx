"use client";

import DashboardCalendar from './DashboardCalendar';

const mockEvents = [
  { date: new Date().toISOString().split('T')[0], type: 'book_return' as const, title: 'Book Return Due' },
  { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], type: 'reservation_expiry' as const, title: 'Reservation Expiry' },
  { date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], type: 'pin_expiry' as const, title: 'PIN Expiry' },
];

export default function CalendarView() {
  return (
    <div className="w-full">
      <DashboardCalendar events={mockEvents} />
    </div>
  );
}
