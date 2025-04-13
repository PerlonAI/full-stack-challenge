'use server'

import { setResultOnCookie } from "@/lib/cookies";
import { userInputSchema, type Word } from "@/lib/types";
import { checkWordle } from "@/lib/wordle";
import * as v from "valibot";
import { ok, err } from 'neverthrow';
import { revalidatePath } from "next/cache";

function extractUserInputFromFormData(form: FormData, rows: number, cols: number){
  const userInput: string[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols; j++) {
      const value = form.get(`userInput[${i}][${j}]`) as string;
      row.push(value);
    }
    userInput.push(row);
  }
  const parsedUserInput = v.safeParse(userInputSchema, userInput);
  if (!parsedUserInput.success) {
    return err(parsedUserInput.issues);
  }
  return ok(parsedUserInput.output);
}

export async function submitInputAction(form: FormData, rows: number, cols: number, answer:Word){
  const userInput = extractUserInputFromFormData(form, rows, cols);

  if (userInput.isErr()) {
    return err(userInput.error);
  }

  const status = checkWordle({
    userInput: userInput.value,
    answer
  });

  setResultOnCookie(userInput.value, status);
  revalidatePath('/')
}

