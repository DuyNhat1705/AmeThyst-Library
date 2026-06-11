import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className = '', children, ...props }) => {
  return (
    <label className={`text-sm font-semibold tracking-[0.01em] ${className}`} {...props}>
      {children}
    </label>
  );
};
