import { WordleState, WordleAction } from "./types";

const row = 6;
const colums = 5;

const createArr = () => {
    let arr = new Array(row);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(colums).fill({
            color: "white",
            letter: ""
        });
    }
    return arr;
};

export const initialState: WordleState = {
    arr: createArr(),
    attemptCount: 0,
    gameStatus: "playing",
    hiddenWord: ["a", "p", "p", "l", "e"]
};

export const wordleReducer = (state: WordleState, action: WordleAction): WordleState => {
    switch (action.type) {
        case "SET_LETTER": {
            const { row, col, letter } = action;
            if (
                row !== state.attemptCount ||
                state.gameStatus !== "playing"
            ) {
                return state;
            }

            const newArr = [...state.arr];
            newArr[row] = [...newArr[row]];
            newArr[row][col] = { ...newArr[row][col], letter };

            return {
                ...state,
                arr: newArr
            };
        }

        // In your reducer.ts file, modify the SUBMIT_GUESS case:

        case "SUBMIT_GUESS": {
            // Check if this is the last attempt
            const isLastAttempt = state.attemptCount === row - 1;

            // Check if row is complete
            const isRowComplete = state.arr[state.attemptCount].every(
                cell => cell.letter !== ""
            );

            if (!isRowComplete) {
                return state;
            }

            const curr = state.attemptCount;
            let count = 0;
            const newArr = [...state.arr];
            newArr[curr] = [...newArr[curr]];

            for (let k = 0; k < newArr[curr].length; k++) {
                const l = newArr[curr][k]["letter"];
                if (l === state.hiddenWord[k]) {
                    count++;
                    newArr[curr][k] = { ...newArr[curr][k], color: "green" };
                } else if (state.hiddenWord.includes(l)) {
                    newArr[curr][k] = { ...newArr[curr][k], color: "yellow" };
                } else {
                    newArr[curr][k] = { ...newArr[curr][k], color: "gray" };
                }
            }

            // Win condition
            if (count === colums) {
                return {
                    ...state,
                    arr: newArr,
                    gameStatus: "won"
                };
            }

            // Loss condition - if this was the last attempt and we didn't win
            if (isLastAttempt) {
                return {
                    ...state,
                    arr: newArr,
                    attemptCount: state.attemptCount + 1,
                    gameStatus: "lost"
                };
            }

            // Continue game
            return {
                ...state,
                arr: newArr,
                attemptCount: state.attemptCount + 1
            };
        }
        case "RESET_GAME":
            return initialState;

        default:
            return state;
    }
};