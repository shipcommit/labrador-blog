'use client';

import { useState, useEffect } from 'react';
import TextArea from './TextArea';
import Button from './Button';
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

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //   const handleRewrite = async () => {
  //     try {
  //       const response = await fetch('/api/rewrite', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ text }),
  //       });
  //       if (!response.ok) throw new Error('Failed to rewrite article');
  //       const result = await response.json();
  //       setRewrittenText(result);
  //     } catch (error) {
  //       console.error('Error rewriting article:', error);
  //     }
  //   };

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
