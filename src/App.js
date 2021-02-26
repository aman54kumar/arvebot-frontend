// React
import React from "react";
// material-ui
import { Paper } from "@material-ui/core";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
// react-router
import { Route, Switch } from "react-router-dom";
// local
import theme from "./theme";
import Header from "./Components/Generic/Header/Header";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import InheritanceCalculatorPage from "./Pages/InheritanceCalculatorPage";
import Footer from "./Components/Generic/Footer/Footer";
import HomePageImage from "./assets/images/homepage-image.jpg";
import ResourcesPage from "./Pages/ResourcesPage";

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${HomePageImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
  rootPaper: {
    minHeight: "100vh",
    background:
      "radial-gradient( circle farthest-corner at 10% 20%,  #FCCABD 0%, #4151C9 45.5% )",
    opacity: "80%",
  },
});

const a = (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/calculator" component={InheritanceCalculatorPage} />
    <Route path="/resources" component={ResourcesPage} />
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

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Paper
        role="img"
        className={classes.root}
        aria-label="Image by Free-Photos from Pixabay"
      >
        <Header />
        <Paper className={classes.rootPaper}>
          {document.location.href.split("//")[1] === "localhost:3000/" ? a : b}
        </Paper>
      </Paper>
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
