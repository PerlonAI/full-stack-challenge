import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  children 
}) => {
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="bg-orange-400 hover:bg-orange-500 focus:ring-orange-300 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default Button;