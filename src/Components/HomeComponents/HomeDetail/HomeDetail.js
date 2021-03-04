import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
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
const HomeDetail = () => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h4" align="center" className={classes.root}>
        Lurer du på hvem som arver Peder Ås når han dør? <br />
        Hvor mye får kona og barna? Hva med stesønnen? <br />
        Og hvor mye kan han testamentere til Lilleviks fuglekikkerforening?{" "}
        <br /> <br />
        <span className={classes.highLightText}>BeregnArv</span> hjelper deg å
        finne løsningen og relevant rettsgrunnlag.
      </Typography>
    </Box>
  );
};

export default HomeDetail;
