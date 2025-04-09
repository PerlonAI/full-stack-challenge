import * as v from "valibot";

export const wordSchema = v.pipe(v.string(), v.brand("word"))

export type Word = v.InferOutput<typeof wordSchema>;

export const userInputSchema = v.pipe(v.array(wordSchema), v.brand("userInput"))

export type UserInput = v.InferOutput<typeof userInputSchema>;

export const wordleStatusSchema = v.pipe( v.union([
  v.literal("absent"),
  v.literal("present"),
  v.literal("correct"),
]), v.brand("wordleStatus"))

export type WordleStatus = v.InferOutput<typeof wordleStatusSchema>;

export const wordleStatusSchemaArray = v.pipe(v.array(v.array(wordleStatusSchema)), v.brand("wordleStatusArray"))
export type WordleStatusArray = v.InferOutput<typeof wordleStatusSchemaArray>;

