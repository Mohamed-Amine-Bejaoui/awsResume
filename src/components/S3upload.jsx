// src/components/S3Upload.js
import React, { useState } from 'react';
import FileUpload from './fileUpload';
import JobDescription from './Jobdesc';
import MatchingResult from './matchresult';
import Home from './home';
import "../Styles/fileup.css"
const S3Upload = () => {
  const [objectKey, setObjectKey] = useState(null);
  const [matchingScore, setMatchingScore] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUploadSuccess = (fileKey) => {
    setObjectKey(fileKey);
  };

  const handleSubmitJobDescription = async (jobDescription) => {
    if (!jobDescription || !objectKey) {
      setError('Please upload a resume and enter a job description.');
      return;
    }

    try {
      const response = await fetch('https://c7o5y1bhi6.execute-api.eu-west-1.amazonaws.com/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription: jobDescription,
          resumeId: objectKey,
        }),
      });

      const data = await response.json();
      setMatchingScore(data.matchScore);  // Assuming Lambda returns matchingScore
    } catch (error) {
      setError('Error matching job description with resume');
    }
  };

  return (
    <div className='fileUpload'>
      <p className='title1'> HireMatch</p>
      <div className='container'>
        <div className='inputs'>
          <FileUpload onUploadSuccess={handleFileUploadSuccess} />
          <div style={{marginTop:"20px"}}>
            <JobDescription onSubmit={handleSubmitJobDescription} />
          </div>
        </div>
      {error && <p className="error-message">{error}</p>}
        <div style={{marginLeft:"-130px"}}>
          <MatchingResult matchingScore={matchingScore} />
        </div>

      </div>
      <p className='powered'>Powered by mohamed amine bejaoui</p>
    </div>
  );
};

export default S3Upload;
