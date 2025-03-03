// src/components/FileUpload.js
import React, { useState } from 'react';
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  region: 'eu-west-1',
  credentials: new AWS.Credentials(
    process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  ),
});

const s3 = new AWS.S3();

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = ({ target: { files } }) => setFile(files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('No file selected!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fileName = `resume-${Date.now()}`;
      const fileUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'resumeuploads',
        Key: fileName,
        Expires: 3600,
        ContentType: file.type,
      });

      const uploadResponse = await fetch(fileUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) throw new Error('Failed to upload file');
      onUploadSuccess(fileName);  // Notify parent component of success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading} style={{backgroundColor:"#00FBFF",height:"30px",borderRadius:"10px",boxShadow:"none",border:"0px"}}>
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FileUpload;
