import React from "react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
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
    console.log(openIndex);
  }, [openIndex]);

  const content = [
    <div>Περιεχόμενο 1: Κάτι ενδιαφέρον εδώ.</div>,
    <div>Περιεχόμενο 2: Κάτι διαφορετικό εδώ.</div>,
    <div>Περιεχόμενο 3: Περισσότερες πληροφορίες.</div>,
    <div>Περιεχόμενο 4: Επιπλέον περιεχόμενο εδώ.</div>,
    <LanguageSwitcher />,
  ];
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: openIndex === index ? "skyblue" : "lightgray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid black",
            }}
            onClick={() => handleAccordionClick(index)}
          >
            Box {index + 1}
          </div>
        ))}
      </div>
      <div>
        {openIndex !== -1 && (
          <div
            style={{
              marginTop: "20px",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            {content[openIndex]}
          </div>
        )}
      </div>
      <Accordion allowToggle marginBottom="3px">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          gap={1}
          overflow="auto" // Προσθήκη ιδιότητας overflow
        >
          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="1px"
              p={3}
              borderRadius="md"
              borderColor="teal"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.4)"
            >
              <AccordionButton
                padding={0}
                _expanded={{ textColor: "teal" }}
                onClick={() => handleAccordionClick(1)}
              >
                <Text fontSize="sm" fontWeight="bold">
                  Tip 1
                </Text>
              </AccordionButton>
            </Box>
            <AccordionPanel>
              <Text fontSize="xs" textAlign="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="1px"
              p={3}
              borderRadius="md"
              borderColor="teal"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.4)"
            >
              <AccordionButton
                padding={0}
                _expanded={{ textColor: "teal" }}
                onClick={() => handleAccordionClick(2)}
              >
                <Text fontSize="sm" fontWeight="bold">
                  Tip 2
                </Text>
              </AccordionButton>
            </Box>
            <AccordionPanel>
              <Text fontSize="xs" textAlign="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="1px"
              p={3}
              borderRadius="md"
              borderColor="teal"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.4)"
            >
              <AccordionButton
                padding={0}
                _expanded={{ textColor: "teal" }}
                onClick={() => handleAccordionClick(3)}
              >
                <Text fontSize="sm" fontWeight="bold">
                  Tip 3
                </Text>
              </AccordionButton>
            </Box>
            <AccordionPanel>
              <Text fontSize="xs" textAlign="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="1px"
              p={3}
              borderRadius="md"
              borderColor="teal"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.4)"
            >
              <AccordionButton
                padding={0}
                _expanded={{ minWidth: "100px", textColor: "teal" }}
                onClick={() => handleAccordionClick(4)}
              >
                <Text fontSize="sm" fontWeight="bold">
                  Tip 4
                </Text>
              </AccordionButton>
            </Box>
            <AccordionPanel>
              <Text maxWidth="200px" fontSize="xs" textAlign="left">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="1px"
              p={3}
              borderRadius="md"
              borderColor="teal"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.4)"
            >
              <AccordionButton
                padding={0}
                _expanded={{ textColor: "teal" }}
                onClick={() => handleAccordionClick(5)}
              >
                <Text fontSize="sm" fontWeight="bold">
                  en/gr
                </Text>
              </AccordionButton>
            </Box>
            <AccordionPanel>
              <LanguageSwitcher />
            </AccordionPanel>
          </AccordionItem>
        </Box>
      </Accordion>
    </div>
  );
};

export default HorizontalAccordion;
