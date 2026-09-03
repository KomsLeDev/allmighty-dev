import { useState } from 'react';
function ImageUploader({ onFileSelect }) {
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <>
      <label htmlFor="file-input">Choisir une photo</label>
      <input id="file-input" type="file" accept="image/*" onChange={handleChange} />
      {fileName && <span className="file-name">{fileName}</span>}
    </>
  );
}

export default ImageUploader;