import ArticleRewriter from './components/ArticleRewriter';

export default function Home() {
  return (
    <div className="flex flex-col items-center py-8 w-full">
      <div className="prose">
        <ArticleRewriter />
      </div>
    </div>
  );
}
