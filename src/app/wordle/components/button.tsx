import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  variant = "primary", 
  children 
}) => {
  const baseClasses = "text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 disabled:opacity-50";
  
  const variantClasses = variant === "primary" 
    ? "bg-orange-400 hover:bg-orange-500 focus:ring-orange-300" 
    : "bg-gray-400 hover:bg-gray-500 focus:ring-gray-300";
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;