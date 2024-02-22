// components/FileUploadForm.js
import { useState } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [templateName, setTemplateName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTemplateNameChange = (event) => {
    setTemplateName(event.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('templateName', templateName);

      // Assuming your API endpoint is '/api/uploadFile'
      await axios.post('/api/uploadFile', formData);

      // Handle success, e.g., show a success message or redirect to another page
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <label>
        Select File:
        <input type="file" onChange={handleFileChange} />
      </label>

      <br />

      <label>
        Template Name:
        <input type="text" value={templateName} onChange={handleTemplateNameChange} />
      </label>

      <br />

      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUploadForm;
