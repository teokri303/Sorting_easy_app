import React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";

import MeshComponent from "./Mesh";
import "../styles/Paginator.css";

const Paginator = ({ items, algorithm }) => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [clicked, setClicked] = useState(false);

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
    setClicked(true);
  };

  const handleArrowClick = (direction) => {
    if (direction === "right" && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedPage(selectedPage + 1);
      setClicked(false);
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedPage(selectedPage - 1);
      setClicked(false);
    }
  };

  const pageNumbers = Array.from(
    { length: items.length },
    (_, index) => index + 1
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    handleResize(); // Ελέγχει το πλάτος της οθόνης όταν η εφαρμογή φορτώνεται
    window.addEventListener("resize", handleResize); // Παρακολουθεί τις αλλαγές μεγέθους της οθόνης

    return () => {
      window.removeEventListener("resize", handleResize); // Καθαρίζει τον event listener κατά το unmount
    };
  }, []);

  return (
    <div>
      <div className="paginator-container">
        <div>
          <h1 className="title_text">
            {algorithm === "SNOR_SHAMMIR"
              ? t("Schnorr Shamir algorithm")
              : t("Shearsort algorithm")}
          </h1>
          {isMobile && clicked && (
            <div className="phase_text">
              <Box
                border="2px"
                borderColor="teal"
                borderRadius="15px"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.4)"
                p="10px"
              >
                <Text textAlign="left" fontSize="sm">
                  {text}
                </Text>
              </Box>
            </div>
          )}
          <Text fontWeight="bold" fontSize="md">
            {items[currentIndex].length} X {items[currentIndex].length}{" "}
          </Text>

          <MeshComponent grid={items[currentIndex]} />
        </div>
        {!isMobile && clicked && (
          <div className="phase_text">
            <Box
              border="2px"
              borderColor="teal"
              borderRadius="15px"
              boxShadow="0 0 10px rgba(0, 0, 0, 0.4)"
              p="15px"
            >
              <Text textAlign="left" fontSize="md">
                {text}
              </Text>
            </Box>
          </div>
        )}
      </div>
      <div className="page-numbers-container">
        {!isMobile && (
          <div className="arrow-left" onClick={() => handleArrowClick("left")}>
            <ArrowLeftIcon />{" "}
          </div>
        )}

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

        {!isMobile && (
          <div
            className="arrow-right"
            onClick={() => handleArrowClick("right")}
          >
            <ArrowRightIcon />
          </div>
        )}
      </div>
      {isMobile && (
        <div className="mobile_arrows">
          <div className="arrow-left" onClick={() => handleArrowClick("left")}>
            <ArrowLeftIcon />{" "}
          </div>
          <div
            className="arrow-right"
            onClick={() => handleArrowClick("right")}
          >
            <ArrowRightIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default Paginator;
