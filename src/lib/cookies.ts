import { cookies } from "next/headers";
import * as v from "valibot";
import { UserInput, WordleStatusArray, userInputSchema, wordleStatusSchemaArray } from "./types";

export function setResultOnCookie(userInput: UserInput, status: WordleStatusArray) {
  const cookieStore = cookies();
  cookieStore.set('userInput', JSON.stringify(userInput));
  cookieStore.set('status', JSON.stringify(status));
}

export function getResultFromCookie() {
  const cookieStore = cookies();
  const userInputJson = cookieStore.get('userInput')?.value;
  const statusJson = cookieStore.get('status')?.value;

  const emptyData = {
    userInput: v.parse(userInputSchema, []),
    status: v.parse(wordleStatusSchemaArray, []),
  };

  if (!userInputJson || !statusJson) {
    return emptyData;
  }
  const _userInput = JSON.parse(userInputJson);
  const _status = JSON.parse(statusJson);

  const userInputResult = v.safeParse(userInputSchema, _userInput);
  if(!userInputResult.success){
    return emptyData;
  }

  const statusResult = v.safeParse(wordleStatusSchemaArray, _status);
  if(!statusResult.success){
    return emptyData;
  }
  return {
    userInput: userInputResult.output,
    status: statusResult.output,
  };
}

