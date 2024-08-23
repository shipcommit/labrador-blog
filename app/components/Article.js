'use client';

import renderElement from '@/utils/renderElement';

export default function Article({ jsonData }) {
  return (
    <div className="flex justify-center py-8">
      <article className="prose">{renderElement(jsonData)}</article>
    </div>
  );
}
