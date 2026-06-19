interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error';
}

export default function Badge({ children, variant = 'success' }: BadgeProps) {
  const colors = {
    success: 'bg-[#006A61] text-white',
    warning: 'bg-orange-100 text-orange-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[variant]}`}>
      {children}
    </span>
  );
}
