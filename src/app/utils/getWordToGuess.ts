const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getWordToGuess = (words: string[]) => {
    const randomInt = getRandomInt(1, words.length);
    return words[randomInt];
};