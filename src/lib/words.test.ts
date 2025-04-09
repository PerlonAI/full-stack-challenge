import { getWords , getRandomWords} from "./words";
import { test , expect} from "vitest";

test("getWords", async () => {
  const result = await getWords();
  expect(result.isOk()).toBe(true);
  if(result.isErr()) {
    throw new Error("result is not ok");
  }
  expect(result.value.words.length).toBeGreaterThan(0);
})


test("getRandomWords", async () => {
  const result = await getWords();
  expect(result.isOk()).toBe(true);
  if(result.isErr()) {
    throw new Error("result is not ok");
  }
  const words = result.value.words;
  const randomWords = await getRandomWords({
    words,
    count: 1,
  });
  expect(randomWords.length).toBe(1);
  randomWords.forEach((word) => {
    expect(words).toContain(word);
  });
})
