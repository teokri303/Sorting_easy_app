import React from "react";
import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { Progress } from "@chakra-ui/react";

import MeshComponent from "./Mesh";
import "../styles/Paginator.css"; // Δημιουργήστε ένα αρχείο CSS (π.χ., Paginator.css) και εισάγετέ το εδώ

const Paginator = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentIndex(pageNumber - 1);
    setSelectedPage(pageNumber);
  };

  const handleArrowClick = (direction) => {
    if (direction === "right" && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedPage(selectedPage + 1);
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedPage(selectedPage - 1);
    }
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
      <Progress size="xs" isIndeterminate />

      <div className="page-numbers-container">
        <div className="arrow-left" onClick={() => handleArrowClick("left")}>
          <ArrowLeftIcon />{" "}
        </div>
        {pageNumbers.map((pageNumber) => (
          <div
            key={pageNumber}
            className={`page-number ${
              selectedPage === pageNumber ? "selected" : ""
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </div>
        ))}
        <div className="arrow-right" onClick={() => handleArrowClick("right")}>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};

export default Paginator;
