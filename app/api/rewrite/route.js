import { NextResponse } from 'next/server';
import rewriteArticle from '@/utils/rewriteArticle';

export async function POST(request) {
  try {
    const { instructions } = await request.json();
    const response = await rewriteArticle(instructions);

    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in rewrite API:', error);
    return NextResponse.json(
      { error: 'Failed to rewrite article' },
      { status: 500 }
    );
  }
}
