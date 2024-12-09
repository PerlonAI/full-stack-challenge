"use client";

import { useState } from "react";

type Props = {
  generatedWord: string;
};

type Character = {
  value: string;
  position: "correct" | "incorrect" | "invalid" | null;
};

type Guess = {
  characters: Array<Character>;
  current: boolean;
  maxLetters: number;
};

const MAX_GUESSES = 6;

function generaInitialState(generatedWord: string) {
  const initialState: Array<Guess> = [];
  for (let index = 0; index < MAX_GUESSES; index++) {
    initialState.push({
      current: index === 0,
      characters: [],
      maxLetters: generatedWord.length,
    });
  }
  return initialState;
}

function CharacterBoxSkeleton() {
  return (
    <div className="h-12 w-12 flex  text-gray-500 justify-center items-center uppercase rounded-md border border-gray-200"></div>
  );
}

function CharacterBox({ character }: { character: Character }) {
  if (character.position === "correct") {
    return (
      <div className="h-12 w-12 flex bg-green-100 text-green-500 justify-center items-center uppercase rounded-md border border-green-200">
        {character.value.toLocaleUpperCase()}
      </div>
    );
  } else if (character.position === "incorrect") {
    return (
      <div className="h-12 w-12 flex bg-amber-100 text-amber-500 justify-center items-center uppercase rounded-md border border-amber-200">
        {character.value.toLocaleUpperCase()}
      </div>
    );
  } else {
    return (
      <div className="h-12 w-12 flex bg-gray-100 text-gray-500 justify-center items-center uppercase rounded-md border border-gray-200">
        {character.value.toLocaleUpperCase()}
      </div>
    );
  }
}

function GuessInput({
  guess,
  check,
}: {
  guess: Guess;
  check: (word: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const slots = Array.from({ length: guess.maxLetters }, (v, i) => i);

  function handleInput(value: string) {
    if (value.length > guess.maxLetters) {
      return;
    }

    setInputValue(value.toLocaleUpperCase());
  }

  function handleClick() {
    if (inputValue.length === guess.maxLetters) {
      return check(inputValue);
    }
  }

  return (
    <div className="flex flex-row gap-2 ">
      {/* We swap between the slots and input  */}
      {!guess.current && (
        <div className="flex flex-row gap-2">
          {slots.map((char, index) => (
            <div key={index}>
              {guess.characters[index]?.value ? (
                <CharacterBox character={guess.characters[index]} />
              ) : (
                <CharacterBoxSkeleton />
              )}
            </div>
          ))}
        </div>
      )}

      {guess.current && (
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={inputValue}
            className="h-12 flex-1 border disabled:bg-gray-100 border-gray-200 px-4 rounded-md w-full"
            placeholder="Enter your guess"
            onChange={(e) => handleInput(e.target.value)}
            disabled={!guess.current}
            required
            autoFocus
          />
          <button
            onClick={handleClick}
            className="px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            Check
          </button>
        </div>
      )}
    </div>
  );
}

export default function Wordle({ generatedWord }: Props) {
  const [guesses, setGuesses] = useState(generaInitialState(generatedWord));
  const [gameState, setGameState] = useState<"win" | "fail" | null>(null);

  function handleCheck(word: string, guessIndex: number) {
    // Here we should cross check if the given word is a real word
    const characters: Array<Character> = word.split("").map((char, index) => {
      const doesCharacterExists = generatedWord
        .split("")
        .some((c) => c.toLocaleLowerCase() === char.toLocaleLowerCase());
      return {
        value: char,
        position:
          generatedWord.charAt(index).toLocaleLowerCase() ===
          char.toLocaleLowerCase()
            ? "correct"
            : doesCharacterExists
            ? "incorrect"
            : "invalid",
      };
    });

    // Deep clone array to avoid change reference
    const currentGuesses = structuredClone(guesses);
    currentGuesses[guessIndex].characters = characters;
    currentGuesses[guessIndex].current = false;
    setGuesses(currentGuesses);

    // If they have gotten all the characters right, stop the game
    const isCorrect = characters.every((char) => char.position === "correct");
    if (isCorrect) {
      setGameState("win");
      return;
    }

    // Otherwise move to the next guess
    if (guessIndex < currentGuesses.length - 1) {
      currentGuesses[guessIndex + 1].current = true;
      setGuesses(currentGuesses);
    } else {
      setGameState("fail");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-8 max-w-xl">
      <div className="flex flex-col gap-4">
        {guesses.map((guess, index) => (
          <div key={index}>
            <GuessInput guess={guess} check={(e) => handleCheck(e, index)} />
          </div>
        ))}
      </div>

      {gameState === "fail" && (
        <div className="px-4 py-2 text-sm rounded-md text-center bg-red-100 text-red-500">
          You have lost the game. The word was{" "}
          {generatedWord.toLocaleUpperCase()}
        </div>
      )}

      {gameState === "win" && (
        <div className="px-4 py-2 text-sm rounded-md text-center bg-green-100 text-green-500">
          You have won the game!
        </div>
      )}
    </div>
  );
}
