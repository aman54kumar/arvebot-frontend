import React from "react";
import { Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import HomePage from "./Components/HomePage/HomePage";
import AboutPage from "./Components/AboutPage/AboutPage";
import InheritanceCalculatorPage from "./Components/InheritanceCalculatorPage/InheritanceCalculatorPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}>
        <HomePage />
        <AboutPage />
        <InheritanceCalculatorPage />
      </Paper>
    </ThemeProvider>
  );
}

export default App;

// react-spring -> animations
// nivo for visualisation
// primary - 003049   , 264653 , 031d44
// secondary - EAE2B7   ,e76f51 , d5896f
