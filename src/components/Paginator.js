import React from "react";
import { useState } from "react";
import TextDisplay from "./phase_expl";

import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

import MeshComponent from "./Mesh";
import "../styles/Paginator.css"; // Δημιουργήστε ένα αρχείο CSS (π.χ., Paginator.css) και εισάγετέ το εδώ

const Paginator = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  const subtitles = [
    "RANDOM ARRAY",
    "PHASE 1 SNAKELIKE BLOCKS",
    "PHASE 2 K-WAY UNSHUFFLE",
    "PHASE 3 SNAKELIKE BLOCKS",
    "PHASE 4 SHORT COLUMNS",
    "PHASE 5 VERTICAL SLICES SORT (1-2...)",
    "PHASE 6 VERTICAL SLICES SORT (2-3...)",
    "PHASE 7 ROWS SORT SNAKELIKE",
    "PHASE 8  2N^3/8 STEPS OF ODD-EVEN TRANSPOTITION  ",
  ];

  const [text, setText] = useState(subtitles[0]);

  const handlePageClick = (pageNumber) => {
    setCurrentIndex(pageNumber - 1);
    setSelectedPage(pageNumber);
    setText(subtitles[pageNumber - 1]);
  };

  const handleArrowClick = (direction) => {
    if (direction === "right" && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedPage(selectedPage + 1);
      setText(subtitles[currentIndex + 1]);
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedPage(selectedPage - 1);
      setText(subtitles[currentIndex - 1]);
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
      <div>
        <TextDisplay text={text} />
      </div>

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
