'use client';

import { useState, useEffect } from 'react';
import TextArea from './TextArea';
import Button from './Button';
import jsObjectToHtml from '@/utils/jsObjectToHtml';
import content from '../../data/content';

export default function Form({ onSubmit }) {
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rewriting, setRewriting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Check if instructions are provided
      if (!instructions) {
        setError(true);
        return { error: true };
      } else {
        setError(false);
      }

      // Set rewriting state to true
      setRewriting(true);

      // Make request
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instructions,
          article: jsObjectToHtml(content),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to rewrite article');
      }

      const data = await response.json();
      console.log('Rewritten article:', data);
      onSubmit(data);

      // Set rewriting state to false
      setRewriting(false);
    } catch (error) {
      setError(true);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <TextArea
        disabled={rewriting}
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

      {error && (
        <u className="mt-4">Husk å forklar hvordan artikkelen skal omskrives</u>
      )}
    </form>
  );
}
