import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
