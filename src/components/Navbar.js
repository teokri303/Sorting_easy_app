import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Navbar = ({ onLogoClick }) => {
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
            Parallel sorting algorithm simulator.
          </p>
        </div>
      </span>
    </div>
  );
};

export default Navbar;
