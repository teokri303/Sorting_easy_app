import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

import MeshComponent from "./Mesh";
import "../styles/Paginator.css";

const Paginator = ({ items, algorithm, on_go_back }) => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  const ss_subs = [
    t("Random array"),
    t("Reshape array to optimal dimensions"),
    t("Phase 1 - Snakelike blocks"),
    t("Phase 2 - K-way  Unshuffle"),
    t("Phase 3 - Snakelike blocks"),
    t("Phase 4 - Sort columns"),
    t("Phase 5 - Vertical slices sort (1-2...)"),
    t("Phase 6 - Vertical slices sort (2-3...)"),
    t("Phase 7 - Rows sort snakelike"),
    t("Phase 8 - 2N^3/8 Steps of odd-even transpotition"),
  ];
  const ss_subs_optimal = [
    t("Random array"),
    t("Phase 1 - Snakelike blocks"),
    t("Phase 2 - K-way  Unshuffle"),
    t("Phase 3 - Snakelike blocks"),
    t("Phase 4 - Sort columns"),
    t("Phase 5 - Vertical slices sort (1-2...)"),
    t("Phase 6 - Vertical slices sort (2-3...)"),
    t("Phase 7 - Rows sort snakelike"),
    t("Phase 8 - 2N^3/8 Steps of odd-even transpotition"),
  ];
  const shearsort_subs = [
    t("Random array"),
    t("Parallel sorting rows snakelike order"),
    t("Parallel sorting columns"),
  ];

  const [text, setText] = useState(shearsort_subs[0]);

  const handlePageClick = (pageNumber) => {
    setCurrentIndex(pageNumber - 1);
    setSelectedPage(pageNumber);
    if (algorithm === "SHEARSHORT") {
      if (pageNumber % 2 === 0) {
        setText(shearsort_subs[1]);
      } else if (pageNumber === 1) {
        setText(shearsort_subs[0]);
      } else {
        setText(shearsort_subs[2]);
      }
    } else {
      if (items[0].length === 16 || items[0].length === 256) {
        setText(ss_subs_optimal[pageNumber - 1]);
      } else {
        if (
          (items[items.length - 1].length !== 16 ||
            items[items.length - 1].length !== 256) &&
          pageNumber === items.length
        ) {
          setText("Reshape to given dimensions");
        } else {
          setText(ss_subs[pageNumber - 1]);
        }
      }
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === "right" && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedPage(selectedPage + 1);
      if (algorithm === "SHEARSHORT") {
        if (currentIndex % 2 === 0) {
          setText(shearsort_subs[1]);
        } else {
          setText(shearsort_subs[2]);
        }
      } else {
        if (items[0].length === 16 || items[0].length === 256) {
          setText(ss_subs_optimal[currentIndex + 1]);
        } else if (
          (items[items.length - 1].length !== 16 ||
            items[items.length - 1].length !== 256) &&
          currentIndex === items.length - 2
        ) {
          setText(t("Reshape to given dimensions"));
        } else {
          setText(ss_subs[currentIndex + 1]);
        }
      }
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedPage(selectedPage - 1);
      if (algorithm === "SHEARSHORT") {
        if (currentIndex % 2 === 0) {
          setText(shearsort_subs[1]);
        } else if (currentIndex === 1) {
          setText(shearsort_subs[0]);
        } else {
          setText(shearsort_subs[2]);
        }
      } else {
        if (items[0].length === 16 || items[0].length === 256) {
          setText(ss_subs_optimal[currentIndex - 1]);
        } else if (
          (items[items.length - 1].length !== 16 ||
            items[items.length - 1].length !== 256) &&
          currentIndex + 1 === items.length - 2
        ) {
          setText(t("Reshape to given dimensions"));
        } else {
          setText(ss_subs[currentIndex - 1]);
        }
      }
    }
  };

  const pageNumbers = Array.from(
    { length: items.length },
    (_, index) => index + 1
  );

  function handle_back_click() {
    on_go_back();
  }

  return (
    <div>
      <div className="paginator-container">
        <div>
          <h1 className="title_text">
            {algorithm === "SNOR_SHAMMIR"
              ? t("Schnorr Shamir algorithm")
              : t("Shearsort algorithm")}
          </h1>
          <p>
            {items[currentIndex].length} X {items[currentIndex].length}{" "}
          </p>

          <MeshComponent grid={items[currentIndex]} />
        </div>
        <div className="phase_text">
          <p>{text}</p>
        </div>
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
