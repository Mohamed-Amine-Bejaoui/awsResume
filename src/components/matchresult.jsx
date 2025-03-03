// src/components/MatchingResult.js
import React from 'react';
import "../Styles/fileup.css"
const MatchingResult = ({ matchingScore }) => {
  if (matchingScore === null) return null;
  return (
    <div>
      <h3 className="resulttitle">Your CV matches this job by :</h3>
      <h3 className='result'>{parseInt(matchingScore)} %</h3>
    </div>
  );
};

export default MatchingResult;
