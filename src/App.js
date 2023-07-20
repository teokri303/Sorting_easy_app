import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import Methods from "./pages/Methods";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/methods" element={<Methods />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
