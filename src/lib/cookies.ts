import { cookies } from "next/headers";
import * as v from "valibot";
import {
	type UserDataOnCookie,
	type Word,
	userDataOnCookieSchema,
	userInputSchema,
	wordleStatusSchemaArray,
} from "./types";
import { getTodaysIndex, getWords } from "./words";

const COOKIE_NAME = "userDataOnCookie";

export function setResultOnCookie(userData: UserDataOnCookie) {
	const cookieStore = cookies();
	const userDataJson = JSON.stringify(userData);
	cookieStore.set(COOKIE_NAME, userDataJson);
}

export async function getResultFromCookie() {
	const cookieStore = cookies();
	const userDataJson = cookieStore.get(COOKIE_NAME)?.value;
	const emptyData = {
		userInput: v.parse(userInputSchema, []),
		status: v.parse(wordleStatusSchemaArray, []),
	};
	if (!userDataJson) {
		return emptyData;
	}
	const userData = JSON.parse(userDataJson);
	const userDataResult = v.safeParse(userDataOnCookieSchema, userData);
	if (!userDataResult.success) {
		return emptyData;
	}
	const words = await getWords().then((w) => w.unwrapOr([] as Word[]));
	if (userDataResult.output.todaysIndex !== getTodaysIndex(words)) {
		return emptyData;
	}
	return {
		userInput: userDataResult.output.userInput,
		status: userDataResult.output.status,
	};
}
