import { useState, useEffect, ReactElement } from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import NavLinks from "../../Generic/Header/HeaderMenu/NavLinks";

const useStyles = makeStyles({
  header: {
    backgroundColor: "white",
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
  return NavLinks.map(({ id, title, path }) => {
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
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        <Grid item sm={6}>
          <HeaderTitle />
        </Grid>
        <Grid item sm={6}>
          <HeaderMenu />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const Header = (): ReactElement => {
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
        <IconButton edge="start" color="inherit" onClick={handleDrawerOpen} size="large" />
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
};

export default Header;
