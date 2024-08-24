'use client';

export default function TextArea({ value, onChange, placeholder, disabled }) {
  return (
    <div className="w-full max-w-md">
      <textarea
        disabled={disabled}
        id="text-area"
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        rows="4"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
