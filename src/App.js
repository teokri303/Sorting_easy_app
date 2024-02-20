import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <ChakraProvider>
      <I18nextProvider i18n={i18n}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </I18nextProvider>
    </ChakraProvider>
  );
}

export default App;
