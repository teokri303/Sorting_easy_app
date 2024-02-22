import React from "react";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import LanguageSwitcher from "./Language_switcher";
import "../styles/Accordion.css";

const HorizontalAccordion = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const handleAccordionClick = (index) => {
    if (index === openIndex) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    //console.log(openIndex);
  }, [openIndex]);

  const content = [
    <div>
      <Text fontSize="sm">How to use</Text>
    </div>,
    <div>
      <Text fontSize="sm">Why 0/1 Lemma?</Text>
    </div>,
    <div>
      <Text fontSize="sm">Reshaping in SS algorithm</Text>
    </div>,
    <div>
      <Text fontSize="sm">About the app</Text>
    </div>,
    <LanguageSwitcher />,
  ];
  return (
    <div className="container_n_content">
      <div className="tip_container">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="tip_box"
            key={index}
            style={{
              backgroundColor:
                openIndex === index ? "rgba(0, 128, 128, 0.5)" : "transparent",
            }}
            onClick={() => handleAccordionClick(index)}
          >
            {index === 4 ? (
              <Text fontWeight="bold" fontSize="sm">
                en/gr
              </Text>
            ) : (
              <Text fontWeight="bold" fontSize="sm">
                Tip {index + 1}
              </Text>
            )}
          </div>
        ))}
      </div>
      <div>
        {openIndex !== -1 && (
          <div
            style={{
              marginTop: "2px",
              padding: "10px",
              overflow: "hidden",
              animation:
                openIndex === -1 ? "fadeOut 1.5s ease" : "fadeIn 1.5s ease",
            }}
          >
            {content[openIndex]}
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalAccordion;
