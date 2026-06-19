import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading,
  ...props 
}) => {
  const baseClasses = "flex items-center justify-center font-semibold transition-all rounded-lg";
  
  const variants = {
    primary: "bg-[#091426] text-white hover:opacity-90 disabled:opacity-50",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-[#C5C6CD] bg-white text-[#0B1C30] hover:bg-gray-50",
    ghost: "text-[#006A61] hover:underline",
    white: "bg-white text-black hover:bg-gray-50"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};
