import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import LanguageSwitcher from "./Language_switcher";

const HorizontalAccordion = () => {
  return (
    <div>
      <Accordion allowToggle marginBottom="3px">
        <Box display="flex" justifyContent="center" flexDirection="row" gap={1}>
          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="2px"
              p={3}
              borderRadius="md"
              borderColor="teal"
            >
              <AccordionButton padding={0} _expanded={{ textColor: "teal" }}>
                Tip 1
              </AccordionButton>
            </Box>
            <AccordionPanel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="2px"
              p={3}
              borderRadius="md"
              borderColor="teal"
            >
              <AccordionButton padding={0} _expanded={{ textColor: "teal" }}>
                Tip 2
              </AccordionButton>
            </Box>
            <AccordionPanel>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="2px"
              p={3}
              borderRadius="md"
              borderColor="teal"
            >
              <AccordionButton padding={0} _expanded={{ textColor: "teal" }}>
                Tip 3
              </AccordionButton>
            </Box>
            <AccordionPanel>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="2px"
              p={3}
              borderRadius="md"
              borderColor="teal"
            >
              <AccordionButton padding={0} _expanded={{ textColor: "teal" }}>
                Tip 4
              </AccordionButton>
            </Box>
            <AccordionPanel>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Box
              display="flex"
              alignItems="center"
              border="2px"
              p={3}
              borderRadius="md"
              borderColor="teal"
            >
              <AccordionButton padding={0} _expanded={{ textColor: "teal" }}>
                en/gr
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
