import renderElement from '@/utils/renderElement';

export default function Article({ jsonData }) {
  return <div>{renderElement(jsonData)}</div>;
}
