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
import { useTranslation } from "react-i18next";

const HorizontalAccordion = () => {
  const { t } = useTranslation();

  const contexts = [
    <Text fontWeight="bold" fontSize="sm">
      {t("how to use_T")}
    </Text>,

    <Text fontWeight="bold" fontSize="sm">
      {t("leema_T")}
    </Text>,

    <Text fontWeight="bold" fontSize="sm">
      {t("mesh enclosures reshape_T")}
    </Text>,
  ];

  const content = [
    <div>
      <Text textAlign="left" fontSize="xs">
        {t("how to use")}
      </Text>{" "}
    </div>,
    <div>
      <Text textAlign="left" fontSize="xs">
        {t("leema")}
      </Text>
    </div>,
    <div>
      <Text textAlign="left" fontSize="xs">
        {t("mesh enclosures reshape")}
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
                      {t("Tips")}
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
                      {t("the purpose_T")}
                    </Text>
                  </Box>
                </AccordionButton>

                <AccordionPanel pb={4} textAlign="left">
                  <Text textAlign="left" fontSize="xs">
                    {t("the purpose")}
                  </Text>
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
