import { submitInputAction } from "@/app/action";
import { getResultFromCookie } from "@/lib/cookies";
import type { Word, WordleStatus, WordleStatusArray } from "@/lib/types";
import clsx from "clsx";

interface InputBoxesProps {
  rows: number;
  cols: number;
  status: WordleStatusArray;
}
/**
* create a input boxes like wordle
*/
function InputBoxes({
  rows,
  cols,
  status
}: InputBoxesProps) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {Array.from({ length: cols }).map((_, colIndex) => (
            < InputBox
              key={colIndex}
              name={`userInput[${rowIndex}][${colIndex}]`}
              status={status.at(rowIndex)?.at(colIndex)}
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
}
function InputBox({ status, name,  }: InputBoxProps) {
  return (
    <input
      type="text"
      name={name}
      maxLength={1}
      className={clsx(
        "w-12 h-12 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
        {
          "bg-gray-200": status === 'absent',
          "bg-green-500": status === 'correct',
          "bg-yellow-500": status === 'present',
        }
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
      <InputBoxes rows={ROWS} cols={COLS} status={status} />
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        submit!
      </button>
    </form>
  )
  }
