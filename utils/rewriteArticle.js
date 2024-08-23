import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({ apiKey });

export default async function rewriteArticle(instructions) {
  if (instructions === undefined || instructions.length === 0) {
    throw 'Instructions are required';
  }

  try {
    const modelRequest = await client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Improve this Norwegian article and return the HTML based on these instructions: ${instructions}`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    return modelRequest.choices[0].message.content;
  } catch (err) {
    console.error('Error rewriting article:', err);
    throw err;
  }
}
