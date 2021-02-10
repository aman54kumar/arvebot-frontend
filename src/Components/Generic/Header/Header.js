import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// import Typography from "@material-ui/core/Typography";

import { Grid } from "@material-ui/core";

import Logo from "./Logo/Logo";
import Title from "./Title/Title";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

import classes from "./Header.module.css";

export default function Header() {
  return (
    <div>
      <AppBar className={classes.Appbar} position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item sm={1}>
              <Logo />
            </Grid>
            <Grid item sm={8}>
              <Title />
            </Grid>
            <Grid item sm={3}>
              <HeaderMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
