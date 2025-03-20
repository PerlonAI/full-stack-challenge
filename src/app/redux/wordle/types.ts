

export type BoxData = {
    color: "white" | "green" | "yellow" | "gray";
    letter: string;
};

export type WordleState = {
    arr: BoxData[][];
    attemptCount: number;
    gameStatus: "playing" | "won" | "lost";
    hiddenWord: string[];
};

export type WordleAction =
    | { type: "SET_LETTER"; row: number; col: number; letter: string }
    | { type: "SUBMIT_GUESS" }
    | { type: "RESET_GAME" };