import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

let NavLinks;

if (document.location.href.split("//")[1] === "localhost:3000/") {
  NavLinks = require("../../Generic/Header/HeaderMenu/NavLinks.js");
} else {
  NavLinks = require("../../Generic/Header/HeaderMenu/NavLinksProd.js");
}

const useStyles = makeStyles({
  header: {
    backgroundColor: "#FEECEA",
    height: "5rem",
  },
  "@media (max-width: 900px)": {
    paddingLeft: 0,
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  menuIconRoot: {
    color: "#4151C9",
  },
});

const getDrawerChoices = () => {
  return NavLinks["default"].map(({ id, title, path }) => {
    return (
      <Link
        {...{
          component: RouterLink,
          to: path,
          color: "inherit",
          style: { textDecoration: "none" },
          key: id,
        }}
      >
        <MenuItem>{title}</MenuItem>
      </Link>
    );
  });
};
const displayDesktop = () => {
  return (
    <Toolbar>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-end"
      >
        <Grid item sm={6}>
          <HeaderTitle />
        </Grid>
        <Grid item sm={6}>
          <HeaderMenu navScroll />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

function Header(props) {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const classes = useStyles();

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <MenuIcon className={classes.menuIconRoot} />
        <IconButton edge="start" color="inherit" onClick={handleDrawerOpen} />
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <HeaderTitle />
      </Toolbar>
    );
  };

  return (
    <AppBar className={classes.header}>
      {mobileView ? displayMobile() : displayDesktop()}
    </AppBar>
  );
}

export default Header;
