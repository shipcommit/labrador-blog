'use client';

import renderElements from '@/utils/renderElements';

export default function Article({ data }) {
  return (
    <article>{typeof data === 'string' ? data : renderElements(data)}</article>
  );
}
