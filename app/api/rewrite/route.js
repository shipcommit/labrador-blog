import { NextResponse } from 'next/server';
import rewriteArticle from '@/utils/rewriteArticle';

export async function POST(request) {
  try {
    const { instructions, article } = await request.json();
    const response = await rewriteArticle(instructions, article);

    console.log('response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in rewrite API:', error);
    return NextResponse.json(
      { error: 'Failed to rewrite article' },
      { status: 500 }
    );
  }
}
