import { words } from '../../../../words.json';

export async function GET() {
    return Response.json(words);
}
