import * as v from "valibot";

export const wordSchema = v.pipe(v.string(), v.brand("word"));

export type Word = v.InferOutput<typeof wordSchema>;

export const wordsFileSchema = v.pipe(
	v.object({
		words: v.array(wordSchema),
	}),
	v.brand("wordsFile"),
);

export type WordsFile = v.InferOutput<typeof wordsFileSchema>;

export const userInputSchema = v.pipe(
	v.array(v.array(v.pipe(v.string(), v.maxLength(1)))),
	v.brand("userInput"),
);

export type UserInput = v.InferOutput<typeof userInputSchema>;

export const wordleStatusSchema = v.pipe(
	v.union([
		v.literal("absent"),
		v.literal("present"),
		v.literal("correct"),
		v.literal(""),
	]),
	v.brand("wordleStatus"),
);

export type WordleStatus = v.InferOutput<typeof wordleStatusSchema>;

export const wordleStatusSchemaArray = v.pipe(
	v.array(v.array(wordleStatusSchema)),
	v.brand("wordleStatusArray"),
);
export type WordleStatusArray = v.InferOutput<typeof wordleStatusSchemaArray>;

export const userDataOnCookieSchema = v.pipe(
	v.object({
		userInput: userInputSchema,
		status: wordleStatusSchemaArray,
		todaysIndex: v.number(),
	}),
	v.brand("userDataOnCookie"),
);
export type UserDataOnCookie = v.InferOutput<typeof userDataOnCookieSchema>;
