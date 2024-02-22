import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
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

    <Text fontWeight="bold" fontSize="sm">
      About the app
    </Text>,

    "    EN/EL",
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
    <div>
      <Text fontSize="sm">This app....</Text>
    </div>,
    <LanguageSwitcher />,
  ];

  return (
    <div className="container_n_content">
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box display="block" alignItems="center">
                <HamburgerIcon />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Accordion allowToggle>
              {contexts.map((context, index) => (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" borderColor="teal">
                      {index === 4 && <SettingsIcon color="teal" />}
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
    </div>
  );
};

export default HorizontalAccordion;
