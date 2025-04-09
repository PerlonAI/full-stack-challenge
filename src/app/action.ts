'use server'

function extractUserInputFromFormData(form: FormData, rows: number, cols: number): string[][] {
  const userInput: string[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols; j++) {
      const value = form.get(`userInput[${i}][${j}]`) as string;
      row.push(value);
    }
    userInput.push(row);
  }
  return userInput;
}

export async function checkUserInputAction(form: FormData, rows: number, cols: number) {
  const userInput = extractUserInputFromFormData(form, rows, cols);
  console.log({userInput, });
  return userInput;
}
