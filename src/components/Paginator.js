import React from "react";
import { useState } from "react";

import MeshComponent from "./Mesh";
import "../styles/Paginator.css"; // Δημιουργήστε ένα αρχείο CSS (π.χ., Paginator.css) και εισάγετέ το εδώ

const Paginator = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePageClick = (pageNumber) => {
    setCurrentIndex(pageNumber - 1);
  };

  const pageNumbers = Array.from(
    { length: items.length },
    (_, index) => index + 1
  );

  return (
    <div className="paginator-container">
      <div className="mesh-container">
        <MeshComponent grid={items[currentIndex]} />
      </div>
      <div className="page-numbers-container">
        {pageNumbers.map((pageNumber) => (
          <div
            key={pageNumber}
            className="page-number"
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paginator;
