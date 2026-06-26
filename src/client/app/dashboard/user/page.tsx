"use client";

import { useState, useEffect } from 'react';
import { UpcomingAgenda } from '../../components/organisms';
import { DashboardCalendar } from '../../components/molecules';
import { getLoggedInUser } from '../../utils/user';
import { useI18n } from '../../providers/I18nProvider';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface EventItem {
  id: number;
  title: string;
  time: string;
  location: string;
  type: string;
  date: string;
}

interface BorrowRecord {
  id: string;
  title: string;
  reserveDate?: string;
  status: string;
}

export default function UserDashboardPage() {
  const { t } = useI18n();
  const user = getLoggedInUser();
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const [eventsRes, borrowedRes] = await Promise.all([
          fetch(`${API_BASE}/dashboard/events`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/api/library/my-borrowed`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const eventsData = eventsRes.ok ? await eventsRes.json() : { events: [] };
        const borrowedData = borrowedRes.ok ? await borrowedRes.json() : { current: [] };

        const events = eventsData.events || [];

        const reservationEvents: EventItem[] = (borrowedData.current || [])
          .filter((record: BorrowRecord) => ['reserved', 'pending'].includes(record.status) && record.reserveDate)
          .map((record: BorrowRecord) => {
            const dueDate = new Date(new Date(record.reserveDate!).getTime() + 7 * 24 * 60 * 60 * 1000);
            const dateStr = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, '0')}-${String(dueDate.getDate()).padStart(2, '0')}`;
            return {
              id: parseInt(record.id.replace(/-/g, '').slice(0, 8), 16),
              title: `Pickup due: ${record.title}`,
              time: '',
              location: '',
              type: 'reservation_due',
              date: dateStr,
            };
          });

        setAllEvents([...events, ...reservationEvents]);
      } catch {
        // silently fail; UI shows empty state
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const tomorrowDate = new Date(today);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = `${tomorrowDate.getFullYear()}-${String(tomorrowDate.getMonth() + 1).padStart(2, '0')}-${String(tomorrowDate.getDate()).padStart(2, '0')}`;

  const todayEvents = allEvents.filter((e) => e.date === todayStr);
  const tomorrowEvents = allEvents.filter((e) => e.date === tomorrowStr);

  const calendarEvents = allEvents.map((e) => ({
    date: e.date,
    type: e.type,
    title: e.title,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-manrope text-[40px] font-bold leading-[54.5px] text-black dark:text-neutral-100">
          {t('dashboard.welcome', { name: user?.username || 'User' })}
        </h1>
      </div>
      <div className="flex gap-8 items-start">
        <div className="flex-1 min-w-0">
          <DashboardCalendar events={calendarEvents} />
        </div>
        <UpcomingAgenda
          today={todayEvents}
          tomorrow={tomorrowEvents}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
