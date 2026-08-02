interface CalendarEventBadgeProps {
  title: string;
  type: string;
}

const typeColors: Record<string, string> = {
  book_return: 'bg-[#061D32]',
  room_reservation: 'bg-[#2F6FA3]',
  study_group: 'bg-[#6E5191]',
  pin_expiry: 'bg-[#BA1A1A]',
  reservation_expiry: 'bg-[#E37400]',
};

export default function CalendarEventBadge({ title, type }: CalendarEventBadgeProps) {
  const color = typeColors[type] || 'bg-neutral-400';

  return (
    <span className={`${color} text-white dark:text-black text-[10px] leading-[15px] px-2 py-0.5 rounded-full truncate w-full`}>
      {title}
    </span>
  );
}
