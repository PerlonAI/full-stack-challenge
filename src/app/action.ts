"use server";

import { setResultOnCookie } from "@/lib/cookies";
import {
	type Word,
	userDataOnCookieSchema,
	userInputSchema,
} from "@/lib/types";
import { checkWordle } from "@/lib/wordle";
import { getTodaysIndex, getWords } from "@/lib/words";
import { err, ok } from "neverthrow";
import { revalidatePath } from "next/cache";
import * as v from "valibot";

function extractUserInputFromFormData(
	form: FormData,
	rows: number,
	cols: number,
) {
	const userInput: string[][] = [];
	for (let i = 0; i < rows; i++) {
		const row: string[] = [];
		for (let j = 0; j < cols; j++) {
			const value = form.get(`userInput[${i}][${j}]`) as string;
			console.log(value);
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

export async function submitInputAction(
	form: FormData,
	rows: number,
	cols: number,
	answer: Word,
) {
	const userInput = extractUserInputFromFormData(form, rows, cols);

	if (userInput.isErr()) {
		return err(userInput.error);
	}

	const status = checkWordle({
		userInput: userInput.value,
		answer,
	});

	const words = await getWords().then((w) => w.unwrapOr([] as Word[]));

	const userDataResult = v.safeParse(userDataOnCookieSchema, {
		userInput: userInput.value,
		status,
		todaysIndex: getTodaysIndex(words),
	});
	if (!userDataResult.success) {
		throw new Error("Invalid user data");
	}
	setResultOnCookie(userDataResult.output);

	revalidatePath("/");
}
