interface InfoGridItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function InfoGridItem({ icon, label, value }: InfoGridItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[#45474C] text-xs font-medium tracking-[0.05em] uppercase">{label}</span>
      </div>
      <p className="text-[#0B1C30] text-sm font-bold">{value}</p>
    </div>
  );
}
