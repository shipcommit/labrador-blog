import Article from './components/Article';
import content from '@/data/content';
import Form from './components/Form';

export default function Home() {
  return (
    <div className="flex flex-col items-center py-8">
      <Form />
      <div className="mt-4">
        <Article jsonData={content} />
      </div>
    </div>
  );
}
