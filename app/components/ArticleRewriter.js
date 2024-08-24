'use client';

import { useState, useEffect } from 'react';
import Article from './Article';
import Form from './Form';

import content from '@/data/content';

export default function ArticleRewriter() {
  const [text, setText] = useState('');
  // const [rewrittenText, setRewrittenText] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Set the initial text to the content from content.js
    setText(content);
  }, []);

  const handleFormSubmit = (data) => {
    setFormData(data);

    console.log('formData ArticleRewriter.js:', formData);
    // You can also update rewrittenText here if needed
    // setRewrittenText(data.someProperty);
  };

  return (
    <div className="grid grid-cols-1 gap-4 items-center w-full max-w-2xl mx-auto">
      <Form className="w-full" onSubmit={handleFormSubmit} />
      <div className="mt-4">
        {formData ? <Article data={formData} /> : <Article data={text} />}
      </div>
    </div>
  );
}
