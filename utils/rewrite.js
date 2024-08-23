import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function rewrite(instructions) {
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
