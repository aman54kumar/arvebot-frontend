import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const root = {
  fontFamily: '"Abril Fatface", serif',
  color: "#016196",
};

const useStyles = makeStyles({ root });
const HeaderTitle = (props) => {
  const classes = useStyles();

  return (
    <Typography variant="h2" className={classes.root} noWrap>
      ARVEBOT
    </Typography>
  );
};

export default HeaderTitle;
