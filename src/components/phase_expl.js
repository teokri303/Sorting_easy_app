import React from "react";
import "../styles/StyledTextDisplay.css"; // Εισαγωγή του αρχείου CSS για το στιλιστικό

const TextDisplay = ({ text }) => {
  if (text === 0) {
    return;
  }
  return (
    <div className="text-display-container">
      <p className="main-text">{text}</p>
    </div>
  );
};

export default TextDisplay;
