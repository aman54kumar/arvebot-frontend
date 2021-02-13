import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import HomePage from "./Components/HomePage/HomePage";
import AboutPage from "./Components/AboutPage/AboutPage";
import InheritanceCalculatorPage from "./Components/InheritanceCalculatorPage/InheritanceCalculatorPage";
import Footer from "./Components/Generic/Footer/Footer";
import Header from "./Components/Generic/Header/Header";
import HomePageImage from "./images/homepage-image.jpg";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${HomePageImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
});
const a = (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/calculator" component={InheritanceCalculatorPage} />
  </Switch>
);
const b = (
  <Switch>
    <Route exact path="/arvebot-frontend/" component={HomePage} />
    <Route path="/arvebot-frontend/about" component={AboutPage} />
    <Route
      path="/arvebot-frontend/calculator"
      component={InheritanceCalculatorPage}
    />
  </Switch>
);
const commonBackgroundClass = {
  background:
    "radial-gradient( circle farthest-corner at 10% 20%,  #00B4DB 0%, #0083B0 45.5% )", //https://uigradients.com/#BlueRaspberry
  opacity: "80%",
};

const useStyles1 = makeStyles({
  root: commonBackgroundClass,
});

const useStyles2 = makeStyles({
  root: commonBackgroundClass,
});

function App(props) {
  const classes = useStyles(props);
  const classes1 = useStyles1(props);
  const classes2 = useStyles2(props);
  return (
    <MuiThemeProvider theme={theme}>
      <div
        role="img"
        className={classes.root}
        aria-label="Image by Free-Photos from Pixabay"
      >
        <Paper className={classes1.root} style={{ minHeight: "100vh" }}>
          <Header className={classes2.root} />
          {document.location.href.split("//")[1] === "localhost:3000/" ? a : b}
        </Paper>
      </div>
      <Footer />

      {/* Route components are rendered if the path prop matches the current URL */}
    </MuiThemeProvider>
  );
}

export default App;

// react-spring -> animations
// nivo for visualisation
// primary - 003049   , 264653 , 031d44
// secondary - EAE2B7   ,e76f51 , d5896f
