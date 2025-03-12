import type { NextApiRequest, NextApiResponse } from 'next';
import { words } from '../../../../words.json';

type ResponseData = {
  words: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({ words });
}

export async function GET() {
  return Response.json(words);
}
