import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";

// import Logo from "./Logo/Logo";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import classes from "./Header.module.css";

export default function Header(props) {
  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  let navbarClasses = [`${classes.Appbar}`];

  if (scrolled) {
    navbarClasses.push(`${classes.scrolled}`);
  }
  return (
    <AppBar
      className={navbarClasses.join(" ")}
      position="sticky"
      color="transparent"
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end"
        >
          <Grid item sm={1}>
            {/* <Logo /> */}
          </Grid>
          <Grid item sm={5}>
            <HeaderTitle />
          </Grid>
          <Grid item sm={4}>
            <HeaderMenu navScroll />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
