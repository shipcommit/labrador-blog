'use client';

import renderElements from '@/utils/renderElements';

export default function Article({ data }) {
  return <article className="prose">{renderElements(data)}</article>;
}
