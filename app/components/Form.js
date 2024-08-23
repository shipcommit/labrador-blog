'use client';

import { useState } from 'react';
import TextArea from './TextArea';
import Button from './Button';

export default function Form() {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to handle the form submission
    console.log('Submitted text:', text);
    // Reset the form after submission
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <TextArea
        prompt="Enter your text here..."
        value={text}
        onChange={handleTextChange}
      />
      <div className="mt-4">
        <Button text="Forbedre" />
      </div>
    </form>
  );
}
