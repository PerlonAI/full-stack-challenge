import { getWords } from "./words";
import { test , expect} from "vitest";

test("getWords", async () => {
  const result = await getWords();
  expect(result.isOk()).toBe(true);
  if(result.isErr()) {
    throw new Error("result is not ok");
  }
  expect(result.value.words.length).toBeGreaterThan(0);
})
