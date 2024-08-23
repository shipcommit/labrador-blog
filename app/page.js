import Article from './components/Article';
import content from '@/data/content';

export default function Home() {
  return (
    <>
      <Article jsonData={content} />
    </>
  );
}
