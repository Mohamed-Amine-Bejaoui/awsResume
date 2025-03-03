// src/components/JobDescription.js
import React, { useState } from 'react';
import "../Styles/fileup.css"
const JobDescription = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleChange = (e) => setJobDescription(e.target.value);

  return (
    <div>
      <textarea
        value={jobDescription}
        onChange={handleChange}
        placeholder="Enter job description here..."
        rows="20"
        cols="50"
        style={{borderRadius:"10px",padding:"10px"}}
      />
      <br></br>
      <button className="buttondesc" onClick={() => onSubmit(jobDescription)}>Match Job Description</button>
    </div>
  );
};

export default JobDescription;
