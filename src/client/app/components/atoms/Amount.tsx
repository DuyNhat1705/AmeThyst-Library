interface AmountProps {
  value: number;
  currency?: string;
  className?: string;
}

export default function Amount({ value, currency = '$', className = '' }: AmountProps) {
  const formatted = `${currency}${value.toFixed(2)}`;
  return (
    <span className={`font-manrope font-bold tabular-nums ${className}`}>
      {formatted}
    </span>
  );
}
