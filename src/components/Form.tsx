import { submitInputAction } from "@/app/action";
import { getResultFromCookie } from "@/lib/cookies";
import type { Word, WordleStatus, WordleStatusArray } from "@/lib/types";
import clsx from "clsx";

interface InputBoxesProps {
  rows: number;
  cols: number;
  status: WordleStatusArray;
  userInput: string[][];
}
/**
* create a input boxes like wordle
*/
function InputBoxes({
  rows,
  cols,
  status,
  userInput,
}: InputBoxesProps) {
  let activeRow = 0;
  for (const row of status) {
    if (row.some((cell) => cell === '')) {
      break;
    }
    activeRow++;
  }
  console.log("activeRow", activeRow);
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <InputBox
              disabled={rowIndex !== activeRow}
              key={colIndex}
              name={`userInput[${rowIndex}][${colIndex}]`}
              status={status.at(rowIndex)?.at(colIndex)}
              value={userInput.at(rowIndex)?.at(colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface InputBoxProps {
  status?: WordleStatus
  name: string;
  disabled?: boolean;
  value?: string;
}
function InputBox({ status, name, disabled, value}: InputBoxProps) {
  /** when we use `disabled` prop, the form will not send the value of this input. therefore we need to use readOnly instead */
  return (
    <input
      type="text"
      readOnly={disabled}
      name={name}
      maxLength={1}
      defaultValue={value}
      pattern="[A-Za-z]"
      className={clsx(
        "w-12 h-12 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
        {
          "bg-white": status === '',
          "bg-gray-200": status === 'absent',
          "bg-green-500": status === 'correct',
          "bg-yellow-500": status === 'present',
          "bg-neutral-100": disabled,
        },
        disabled && "cursor-not-allowed",
      )}
    />
  );
}


interface FormProps {
  targetWord: Word;
  ROWS: number;
  COLS: number;
}
export async function Form({
  targetWord,
  ROWS,
  COLS,
}: FormProps) {
  const { status, userInput } = await getResultFromCookie()

  return (
    <form action={async(form)=>{
      'use server'
      await submitInputAction(form,ROWS,COLS, targetWord);
    }} >
      <InputBoxes rows={ROWS} cols={COLS} status={status} userInput={userInput} />
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        submit!
      </button>
    </form>
  )
  }
