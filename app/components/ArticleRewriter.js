'use client';

import { useState, useEffect } from 'react';
import Article from './Article';
import Form from './Form';

import content from '@/data/content';

export default function ArticleRewriter() {
  const [text, setText] = useState('');
  const [rewrittenText, setRewrittenText] = useState(null);

  useEffect(() => {
    // Set the initial text to the content from content.js
    setText(content);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 items-center w-full max-w-2xl mx-auto">
      <Form className="w-full" />
      <div className="mt-4">
        {rewrittenText ? (
          <Article data={rewrittenText} />
        ) : (
          <Article data={text} />
        )}
      </div>
    </div>
  );
}
