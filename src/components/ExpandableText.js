import { useState } from "react";
import { Text, Collapse, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function ExpandableText({ text }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Collapse startingHeight={40} in={expanded}>
        <Text fontSize="sm" dangerouslySetInnerHTML={{ __html: text }} />
      </Collapse>
      {!expanded ? (
        <Box
          as="span"
          fontSize="sm"
          color="black"
          textDecoration="underline"
          cursor="pointer"
          onClick={toggleExpanded}
          mt={2}
        >
          {t("More text")}
        </Box>
      ) : (
        <Box
          as="span"
          fontSize="sm"
          color="black"
          textDecoration="underline"
          cursor="pointer"
          onClick={toggleExpanded}
          mt={2}
        >
          {t("Less text")}
        </Box>
      )}
    </Box>
  );
}

export default ExpandableText;
