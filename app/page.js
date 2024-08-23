import Article from './components/Article';
import content from '@/data/content';
import Button from './components/Button';
import TextArea from './components/TextArea';

export default function Home() {
  return (
    <div className="flex flex-col items-center py-8">
      <TextArea
        prompt="Enter your text here..."
        // value={content}
        // onChange={() => {}}
      />
      <Button text="Forbedre" />
      <div className="mt-4">
        <Article jsonData={content} />
      </div>
    </div>
  );
}
