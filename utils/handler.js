import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey });

import rewriteArticle from './rewriteArticle';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  try {
    // Use your existing rewriteArticle logic here
    const result = await rewriteArticle(text);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error rewriting article:', error);
    res.status(500).json({ error: 'Failed to rewrite article' });
  }
}
