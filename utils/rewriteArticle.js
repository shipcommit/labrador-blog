import OpenAI from 'openai';

console.log(process.env);

const apiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({ apiKey });

export default async function rewriteArticle(instructions) {
  const modelRequest = await client.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Improve this Norwegian article and return the HTML based on these instructions: ${instructions}`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return modelRequest;
}
