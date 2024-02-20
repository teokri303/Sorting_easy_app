import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

import i18n from "i18next";

function LanguageSwitcher() {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 100,
        margin: "20px",
      }}
    >
      <p style={{ fontSize: "13px" }}>{t("language choose")}</p>
      <RadioGroup
        defaultValue={language}
        onChange={(value) => changeLanguage(value)}
      >
        <Stack direction="row">
          <Radio colorScheme="teal" value="en">
            {t("English")}
          </Radio>
          <Radio colorScheme="teal" value="gr">
            {t("Greek")}
          </Radio>
        </Stack>
      </RadioGroup>
    </div>
  );
}

export default LanguageSwitcher;
