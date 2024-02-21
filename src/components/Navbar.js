import React from "react";
import { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import LanguageSwitcher from "./Language_switcher";
import { useTranslation } from "react-i18next";

const Navbar = ({ onLogoClick }) => {
  const { t } = useTranslation();

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
    <div className="navbarstyle">
      <span
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onLogoClick}
      >
        <Box boxSize="60px" marginRight="10px" marginLeft="20px">
          <Image src="/media/onlylogo.png" />
        </Box>
        <div>
          <p> Sorting easy </p>
          <p
            style={{
              fontSize: "15px",
            }}
          >
            {t("Subtitle")}
          </p>
        </div>
        {!isMobile && (
          <div className="language">
            <LanguageSwitcher />
          </div>
        )}
      </span>
    </div>
  );
};

export default Navbar;
