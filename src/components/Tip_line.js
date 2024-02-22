import React from "react";
import { Box, Text } from "@chakra-ui/react";

const TipBox = ({ title, content }) => {
  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px solid teal",
        borderColor: "teal",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
        borderRadius: "15px",
        margin: "10px",
        marginBottom: "40px",
        padding: "10px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>
      {content}
    </div>
  );
};

const Tipline = () => {
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
  ];

  const titles = [
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
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {content.map((item, index) => (
        <TipBox key={index} title={titles[index]} content={item} />
      ))}
    </div>
  );
};

export default Tipline;
