'use client';

import renderElements from '@/utils/renderElements';

export default function Article({ jsonData }) {
  return (
    <div className="flex justify-center py-8">
      <article className="prose">{renderElements(jsonData)}</article>
    </div>
  );
}
