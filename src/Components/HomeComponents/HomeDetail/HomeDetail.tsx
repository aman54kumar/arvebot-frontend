import { ReactElement } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Box, Typography } from "@mui/material";
import Typed from 'react-typed';
// import Typed from "typed.js";

const useStyles = makeStyles({
  root: {
    padding: "10rem 20rem",
    color: "white",
    fontFamily: '"Work Sans", sans-serif',
  },
  highLightText: {
    fontFamily: '"Abril Fatface", serif',
    fontSize: "4rem",
    color: "yellow",
  },
});

const HomeDetail = (): ReactElement => {
  const classes = useStyles();
  const textLines = ["hjelper deg å finne løsningen og relevant rettsgrunnlag."]
  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.root}>
        Lurer du på hvem som arver Peder Ås når han dør? <br />
        Hvor mye får kona og barna? Hva med stesønnen? <br />
        Og hvor mye kan han testamentere til Lilleviks fuglekikkerforening?{" "}
        <br /> <br />
        <span className={classes.highLightText}>BeregnArv</span> <Typed typeSpeed={50} strings={textLines}></Typed>
      </Typography>
    </Box >
  );
};

export default HomeDetail;
