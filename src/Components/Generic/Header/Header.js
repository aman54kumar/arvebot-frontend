import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

const useStyles = makeStyles({
  normalView: {
    backgroundColor: "#FEECEA",
    height: "5rem",
  },
});

function Header(props) {
  const classes = useStyles();
  return (
    <AppBar className={classes.normalView}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
        >
          {/* <Grid item sm={1}> */}
          {/* <Logo /> */}
          {/* </Grid> */}
          <Grid item sm={6}>
            <HeaderTitle />
          </Grid>
          <Grid item sm={6}>
            <HeaderMenu navScroll />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
