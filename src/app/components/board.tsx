'use client';
import {useState} from 'react';

const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 5;

const Rows = ({ wordToGuess }: { wordToGuess: string}) => {
    return (
        <div className="grid grid-cols-5 gap-1">
            {Array(NUMBER_OF_ROWS).fill(null).map((_, r) => (
                <Row key={r} wordToGuess={wordToGuess} />
            ))}
        </div>
    )
}

const getTilesState = ({ wordToGuess, guessedWord }: { wordToGuess: string, guessedWord: string}): TileState[] => {
    return guessedWord.split('').map((guessedLetter, index) => {
        const indexInWordToGuess = wordToGuess.indexOf(guessedLetter);
        if (indexInWordToGuess === -1) {
            return 'no match'
        }
        if (indexInWordToGuess === index) {
            return 'full match'
        }
        return 'partial match'
    })
}

const Row = ({ wordToGuess }: { wordToGuess: string}) => {
    const [guessedWord, setGuessedWord] = useState('');
    const hasEnteredWord = guessedWord.length === NUMBER_OF_COLUMNS;

    const tilesState = getTilesState({ wordToGuess, guessedWord });

    console.log(guessedWord);

    const onLetterChange = (value: string, index: number) => {
        setGuessedWord(prevState => {
            const newState = prevState.split('');
            newState[index] = value;
            return newState.join('');
        })
    }

    return Array(NUMBER_OF_COLUMNS).fill(null).map((_, index) => (
        <Tile key={index} onLetterChange={onLetterChange} index={index} isInputEnabled={!hasEnteredWord} state={hasEnteredWord ? tilesState[index] : 'unchecked'} />
    ));
}

type TileProps = { index: number; onLetterChange(value: string, index: number): void; isInputEnabled: boolean, state: TileState };

type TileState = 'unchecked' | 'partial match' | 'full match' | 'no match';

const stateToBackgroundColor: Record<TileState, string> = {
    unchecked: 'bg-red-300',
    'partial match': 'bg-yellow-300',
    'full match': 'bg-green-300',
    'no match': 'bg-gray-600',
}

const Tile = ({ onLetterChange, index, isInputEnabled, state }: TileProps) => {
    const [letter, setLetter] = useState('');

    const backgroundColor = stateToBackgroundColor[state];

       return <input className={`w-8 h-8 flex justify-center items-center ${backgroundColor}`} value={letter} type="text" maxLength={1} disabled={!isInputEnabled} onInput={e => {
           setLetter(e.currentTarget.value)
           onLetterChange(e.currentTarget.value, index);
       }} />
}

export const Board = ({ wordToGuess }: { wordToGuess: string}) => {
    const [guessedWords, setGuessedWords] = useState<string[]>([]);

    return (
        <section className="flex w-1/2 mx-auto">
            <Rows wordToGuess={wordToGuess} />
        </section>
    )
}