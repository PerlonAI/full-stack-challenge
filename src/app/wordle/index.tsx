"use client"

import React, { useReducer, useRef, useEffect } from "react";
import { wordleReducer, initialState } from "@/app/redux/wordle/reducer";
import { setLetter, submitGuess, resetGame } from "@/app/redux/wordle/action";
import Box from "./components/box";
import Button from "./components/button";
import Status from "./components/status";

const Wordle: React.FC = () => {
	const [state, dispatch] = useReducer(wordleReducer, initialState);
	const { arr, attemptCount, gameStatus, hiddenWord } = state;

	const row = 6, colums = 5;
	const inputRefs = useRef(Array(row).fill(null).map(() =>
		Array(colums).fill(null).map(() => React.createRef<HTMLInputElement>())
	));

	useEffect(() => {
		if (attemptCount < row) {
			inputRefs.current[attemptCount][0]?.current?.focus();
		}
	}, [attemptCount, gameStatus]);

	const onChange = (i: number, j: number, val: string) => {
		const char = val.replace(/[^a-zA-Z]/g, "").toLowerCase().slice(0, 1);

		dispatch(setLetter(i, j, char));
		if (char && j < colums - 1) {
			inputRefs.current[i][j + 1]?.current?.focus();
		}
	};

	const handleKeyDown = (i: number, j: number, e: React.KeyboardEvent) => {
		if (i !== attemptCount) return;

		if (e.key === "Backspace" && j > 0 && !arr[i][j].letter) {
			inputRefs.current[i][j - 1]?.current?.focus();
		} else if (e.key === "Enter") {
			onSubmit();
		} else if (e.key === "ArrowLeft" && j > 0) {
			inputRefs.current[i][j - 1]?.current?.focus();
		} else if (e.key === "ArrowRight" && j < colums - 1) {
			inputRefs.current[i][j + 1]?.current?.focus();
		}
	};

	const isRowComplete = () => {
		return arr[attemptCount]?.every(cell => cell.letter !== "");
	};

	const onSubmit = () => {
		dispatch(submitGuess());
	};

	const handleReset = () => {
		dispatch(resetGame());
	};

	return (
		<div className="m-24">
			<h1 className="text-3xl font-bold mb-2 text-orange-500">WORDLE GAME</h1>
			{arr.map((row, i) => (
				<div key={i} className="flex">
					{row.map((col, j) => (
						<Box
							key={`${i}-${j}`}
							value={arr[i][j]}
							rowIndex={i}
							colIndex={j}
							onChange={onChange}
							onKeyDown={handleKeyDown}
							disabled={i !== attemptCount || gameStatus !== "playing"}
							inputRef={inputRefs.current[i][j]}
						/>
					))}
				</div>
			))}

			<div className="mt-4 flex space-x-4">
				<Button
					onClick={onSubmit}
					disabled={!isRowComplete() || gameStatus !== "playing"}
				>
					Enter
				</Button>

				<Button
					onClick={handleReset}
				>
					Reset
				</Button>
			</div>
			<Status gameStatus={gameStatus} hiddenWord={hiddenWord} />
		</div>
	);
};

export default Wordle;