import { words as fiveLetterWords } from '../../../../../five-letter-words.json';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');

    if (!word) {
        return Response.json({
            isValid: false,
        });
    }

    return Response.json({ isValid: fiveLetterWords.includes(word.toLowerCase()) });
}
