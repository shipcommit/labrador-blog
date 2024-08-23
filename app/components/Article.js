'use client';

import renderElements from '@/utils/renderElements';

export default function Article({ jsonData }) {
  return <article className="prose">{renderElements(jsonData)}</article>;
}
