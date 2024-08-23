'use client';

import { useState, useEffect } from 'react';
import TextArea from './TextArea';
import Button from './Button';
import jsObjectToHtml from '@/utils/jsObjectToHtml';
import content from '../../data/content';

export default function Form() {
  const [instructions, setInstructions] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    console.log('jsObjectToHtml(content):', jsObjectToHtml(content));

    e.preventDefault();
    setIsLoading(true);
    try {
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
        setError(true);

        throw new Error('Failed to rewrite article');
      }

      //   if (response.error) {
      //     setError(true);
      //   }

      const data = await response.json();
      console.log('Rewritten article:', data);
      setResult(data.rewrittenArticle);
    } catch (error) {
      setError(true);
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
      {/* {error && <p>Husk å forklar hvordan artikkelen skal omskrives</p>} */}
      {useEffect(() => {
        if (error) {
          <p>Husk å forklar hvordan artikkelen skal omskrives</p>;
        }

        console.log('error:', error);
      }, [error])}
    </form>
  );
}
