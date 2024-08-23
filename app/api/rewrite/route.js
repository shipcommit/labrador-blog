import { NextResponse } from 'next/server';
import rewriteArticle from '@/utils/rewriteArticle';

export async function POST(request) {
  try {
    const { instructions, article } = await request.json();
    const response = await rewriteArticle(instructions, article);

    console.log(response);
    return NextResponse.json(response);
    // const jsonResponse = new Response(JSON.stringify(response), {
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // return jsonResponse;
  } catch (error) {
    console.error('Error in rewrite API:', error);
    return NextResponse.json(
      { error: 'Failed to rewrite article' },
      { status: 500 }
    );
  }
}
