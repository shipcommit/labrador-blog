'use client';

import renderElements from '@/utils/renderElements';

export default function Article({ data }) {
  function keepAfterFirstBracket(str) {
    const index = str.indexOf('<h1>');
    return index !== -1 ? str.slice(index) : '';
  }

  return (
    <>
      <article>
        {typeof data === 'string' ? (
          <div
            dangerouslySetInnerHTML={{ __html: keepAfterFirstBracket(data) }}
          />
        ) : (
          renderElements(data)
        )}
      </article>
    </>
  );
}
