import React from "react";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import LanguageSwitcher from "./Language_switcher";

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
    <div>Περιεχόμενο 1: Κάτι ενδιαφέρον εδώ.</div>,
    <div>Περιεχόμενο 2: Κάτι διαφορετικό εδώ.</div>,
    <div>Περιεχόμενο 3: Περισσότερες πληροφορίες.</div>,
    <div>Περιεχόμενο 4: Επιπλέον περιεχόμενο εδώ.</div>,
    <LanguageSwitcher />,
  ];
  return (
    <div style={{ marginTop: "5px", marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "55px",
              height: "45px",
              backgroundColor: openIndex === index ? "teal" : "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              borderColor: "teal",
              borderRadius: "15%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => handleAccordionClick(index)}
          >
            {index === 4 ? "en/gr" : `Tip ${index + 1}`}
          </div>
        ))}
      </div>
      <div>
        {openIndex !== -1 && (
          <div
            style={{
              marginTop: "2px",
              padding: "10px",
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
