import React, { useRef } from 'react';
import './FilePicker.css';

export default function FilePicker({ onFileSelect }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="me-2">
      <button
        className="btn p-0 border-0 bg-transparent"
        onClick={() => inputRef.current.click()}
      >
        <span className="filepicker-icon">
          <i className="bi bi-paperclip"></i>
        </span>
      </button>
      <input
        type="file"
        accept="*/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
