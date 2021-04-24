// React
import React, { useState } from "react";
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
import { IntlProvider } from "react-intl";
import Norsk from "./languages/translationNO.json";
import English from "./languages/translationEN.json";

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${HomePageImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
  rootPaper: {
    marginTop: "5rem",
    minHeight: "100vh",
    background:
      "radial-gradient( circle farthest-corner at 10% 20%,  #FCCABD 0%, #4151C9 45.5% )",
    opacity: "80%",
  },
});

const menuItems = (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/calculator" component={InheritanceCalculatorPage} />
    <Route path="/resources" component={ResourcesPage} />
  </Switch>
);

function App() {
  const classes = useStyles();
  const [lang, setLang] = useState("nb-NO");
  const [langMessages, setLangMessages] = useState(Norsk);

  const sendDataToParent = (index) => {
    setLang(index.code);
    if (index.code === "nb-NO") {
      setLangMessages(Norsk);
    } else {
      setLangMessages(English);
    }
  };

  const LangValue = {
    no: {
      code: "nb-NO",
      name: "Norsk",
    },
    en: {
      code: "en-US",
      name: "English",
    },
  };

  return (
    <IntlProvider locale={lang} messages={langMessages}>
      <MuiThemeProvider theme={theme}>
        <Paper
          role="img"
          className={classes.root}
          aria-label="Image by Free-Photos from Pixabay"
        >
          <Header />
          <Paper className={classes.rootPaper}>{menuItems}</Paper>
        </Paper>
        <Footer langValue={LangValue} sendDataToParent={sendDataToParent} />

        {/* Route components are rendered if the path prop matches the current URL */}
      </MuiThemeProvider>
    </IntlProvider>
  );
}

export default App;

// react-spring -> animations
// nivo for visualisation
// primary - 003049   , 264653 , 031d44
// secondary - EAE2B7   ,e76f51 , d5896f
