import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";

import LanguageSwitcher from "./Language_switcher";
import { SettingsIcon, HamburgerIcon } from "@chakra-ui/icons";
import "../styles/Accordion.css";

const HorizontalAccordion = () => {
  const contexts = [
    <Text fontWeight="bold" fontSize="sm">
      How to use
    </Text>,

    <Text fontWeight="bold" fontSize="sm">
      Why B&W?
    </Text>,

    <Text fontWeight="bold" fontSize="sm">
      Mesh enclosures
    </Text>,
  ];

  const content = [
    <div>
      <Text fontSize="sm">At first you choose ...</Text>
    </div>,
    <div>
      <Text fontSize="sm">
        The black and white cells in the mesh you create....etc etc
      </Text>
    </div>,
    <div>
      <Text fontSize="sm">
        The SS algorithm if you choose dimensions other than.....
      </Text>
    </div>,
  ];

  return (
    <div className="container_n_content">
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box display="flex" alignItems="center">
              <HamburgerIcon />
            </Box>
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box display="flex" alignItems="center">
                    <Text fontWeight="bold" fontSize="sm">
                      Tips
                    </Text>
                  </Box>
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Accordion allowToggle>
                    {contexts.map((context, index) => (
                      <AccordionItem key={index}>
                        <AccordionButton>
                          <Box flex="1" textAlign="left" borderColor="teal">
                            {context}
                          </Box>
                        </AccordionButton>

                        <AccordionPanel pb={4} textAlign="left">
                          {content[index]}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" borderColor="teal">
                    <Text fontWeight="bold" fontSize="sm">
                      About the app
                    </Text>
                  </Box>
                </AccordionButton>

                <AccordionPanel pb={4} textAlign="left">
                  <Text fontSize="sm">This app....</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" borderColor="teal">
                    <Text fontWeight="bold" fontSize="sm">
                      <SettingsIcon color="teal" /> EN/EL
                    </Text>
                  </Box>
                </AccordionButton>

                <AccordionPanel pb={4} textAlign="left">
                  <LanguageSwitcher />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HorizontalAccordion;
