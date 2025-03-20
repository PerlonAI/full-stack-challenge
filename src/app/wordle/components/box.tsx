// app/wordle/components/Box.tsx
import React from "react";
import { BoxData } from "@/app/redux/wordle/types";

interface BoxProps {
  value: BoxData;
  rowIndex: number;
  colIndex: number;
  onChange: (rowIndex: number, colIndex: number, value: string) => void;
  onKeyDown: (rowIndex: number, colIndex: number, e: React.KeyboardEvent) => void;
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const Box: React.FC<BoxProps> = ({ 
  value, 
  rowIndex, 
  colIndex, 
  onChange, 
  onKeyDown, 
  disabled,
  inputRef
}) => {
  return (
    <input
      ref={inputRef}
      value={value.letter}
      onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
      onKeyDown={(e) => onKeyDown(rowIndex, colIndex, e)}
      maxLength={1}
      disabled={disabled}
      style={{ 
        backgroundColor: value.color,
        color: value.color === "white" ? "black" : "white"
      }}
      className="w-16 h-16 m-1 text-center text-4xl uppercase font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default Box;