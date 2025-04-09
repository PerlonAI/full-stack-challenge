import { z } from "zod";

export const wordSchema = z.string().brand("word");

export type Word = z.infer<typeof wordSchema>;

export const wordsSchema = z.object({
  words: z.array(wordSchema),
}).brand("words");

export type Words = z.infer<typeof wordsSchema>;

export const wordleStatusSchema = z.enum([
  "correct",
  "present",
  "absent",
])

export type WordleStatus = z.infer<typeof wordleStatusSchema>;

