import React from "react";
import { useState } from "react";
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
      <Text fontSize="sm">Information about the use of app.</Text>
    </div>,
    <div>
      <Text fontSize="sm">Why 0/1 Lemma?</Text>
    </div>,
    <div>
      <Text fontSize="sm">
        Why SS algorithm reshapes my grid from 8x8 to 16x16 etc?
      </Text>
    </div>,
    <div>
      <Text fontSize="sm">About and more tips if needed.</Text>
    </div>,
  ];

  const titles = [
    "How to use",
    "Why 0/1 Lemma?",
    "Reshaping in SS algorithm",
    "About the app",
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
