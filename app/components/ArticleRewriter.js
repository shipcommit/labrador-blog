'use client';

import { useState } from 'react';
import Article from './Article';
import Form from './Form';

import content from '@/data/content';

export default function ArticleRewriter() {
  const [formResponse, setFormResponse] = useState(null);

  const handleFormSubmit = (data) => {
    setFormResponse(data);
  };

  return (
    <div className="grid grid-cols-1 gap-4 items-center w-full max-w-2xl mx-auto">
      <Form className="w-full" onSubmit={handleFormSubmit} />
      <div className="mt-4">
        {formResponse ? (
          <Article data={formResponse} />
        ) : (
          <Article data={content} />
        )}
      </div>
    </div>
  );
}
