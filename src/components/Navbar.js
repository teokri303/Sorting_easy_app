import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Navbar = ({ onLogoClick, onTextClick }) => {
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
        <Box boxSize="50px" marginRight="10px" marginLeft="20px">
          <Image src="/media/onlylogo.png" />
        </Box>
        <p>Sorting easy</p>
      </span>
    </div>
  );
};

export default Navbar;
