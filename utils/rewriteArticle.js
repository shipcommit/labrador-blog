import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function rewriteArticle(instructions, article) {
  try {
    console.log('Rewriting article...');

    const modelRequest = await client.messages.create({
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Improve this Norwegian article and return the HTML based on these instructions: ${instructions}`,
        },
        {
          role: 'assistant',
          content: 'No problem, please provide the article',
        },
        {
          role: 'user',
          content: `Article:
              ${article}`,
        },
      ],
      model: 'claude-3-5-sonnet-20240620',
    });

    return modelRequest.content[0].text;
  } catch (err) {
    console.error('Error rewriting article:', err);
    throw err;
  }
}
