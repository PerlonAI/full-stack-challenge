interface InputBoxesProps {
  rows: number;
  cols: number;
}
/**
* create a input boxes like wordle
*/
export function InputBoxes({
  rows,
  cols,
}: InputBoxesProps) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              name={`userInput[${rowIndex}][${colIndex}]`}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
