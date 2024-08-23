'use client';

import { useState } from 'react';
import TextArea from './TextArea';
import Button from './Button';

export default function Form() {
  const [instructions, setInstructions] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructions }),
      });

      if (!response.ok) {
        throw new Error('Failed to rewrite article');
      }

      const data = await response.json();
      setResult(data.rewrittenArticle);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <TextArea
        placeholder="Fortell hva som må forbedres med artikkelen..."
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <div className="mt-4">
        <Button
          text={isLoading ? 'Forbedrer...' : 'Forbedre'}
          type="submit"
          disabled={isLoading}
        />
      </div>
      {result && <div dangerouslySetInnerHTML={{ __html: result }} />}
    </form>
  );
}
