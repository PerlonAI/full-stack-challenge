import { getWords , getTodaysWord} from "./words";
import { test , expect, vi} from "vitest";

test("getWords", async () => {
  const result = await getWords();
  expect(result.isOk()).toBe(true);
  if(result.isErr()) {
    throw new Error("result is not ok");
  }
  expect(result.value.words.length).toBeGreaterThan(0);
})

test("getTodaysWord", async () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2000, 1, 1, 1))
  const result = await getWords();
  expect(result.isOk()).toBe(true);
  if(result.isErr()) {
    throw new Error("result is not ok");
  }
  const word = getTodaysWord(result.value.words);
  expect(word).toEqual('Apple')
  vi.useRealTimers()
})
