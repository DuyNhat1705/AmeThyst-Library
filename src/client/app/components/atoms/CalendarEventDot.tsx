interface CalendarEventDotProps {
  type: string;
  size?: 'sm' | 'md';
}

const typeDots: Record<string, string> = {
  book_return: 'bg-[#061D32]',
  room_reservation: 'bg-[#009484]',
  study_group: 'bg-[#6E5191]',
  pin_expiry: 'bg-[#BA1A1A]',
  reservation_expiry: 'bg-[#E37400]',
};

const sizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
};

export default function CalendarEventDot({ type, size = 'sm' }: CalendarEventDotProps) {
  const color = typeDots[type] || 'bg-neutral-400';
  return (
    <div className={`${sizes[size]} rounded-full shrink-0 ${color}`} />
  );
}
