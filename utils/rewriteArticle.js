// import OpenAI from 'openai';

// const apiKey = process.env.OPENAI_API_KEY;

// const client = new OpenAI({ apiKey });

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function rewriteArticle(instructions, article) {
  try {
    if (instructions === undefined || instructions.length === 0) {
      // throw new Error('Husk å forklar hvordan artikkelen skal omskrives');
      return {
        error: 'Husk å forklar hvordan artikkelen skal omskrives',
      };
    }

    // console.log('instructions:', instructions);

    // const modelRequest = await client.chat.completions.create({
    //   messages: [
    //     {
    //       role: 'user',
    //       content: `Improve this Norwegian article and return the HTML based on these instructions: ${instructions}`,
    //     },
    //     {
    //       role: 'user',
    //       content: `Article:
    //       ${article}`,
    //     },
    //   ],
    //   model: 'gpt-3.5-turbo',
    // });

    // return modelRequest.choices[0].message.content;

    console.log('Improving article...');

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
      model: 'claude-3-opus-20240229',
    });

    return modelRequest.content[0].text;
  } catch (err) {
    console.error('Error rewriting article:', err);
    throw err;
  }
}
