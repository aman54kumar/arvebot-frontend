import React from "react";
// import classes from "./MenuLink.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    fontFamily: '"Work Sans", sans-serif',
    fontWeight: "300",
    fontSize: "1.3rem",
    color: "#4151C9",
    padding: "0 20px",
    textDecoration: "none",
    textAlign: "center",
    "&:hover": {
      color: "#FFF5EE",
      backgroundColor: "#87AFC7",
      fontWeight: "bold",
    },
  },
  rootActive: {
    backgroundColor: "#FFCBA4",
    color: "#2B3856",
    "&:hover": {
      backgroundColor: "#FCCABD",
      color: "#2B3856",
    },
  },
});

const MenuLink = (props) => {
  const classes = useStyles(props);
  return (
    <NavLink
      to={props.href}
      className={classes.root}
      exact
      activeClassName={classes.rootActive}
    >
      {props.name}
    </NavLink>
  );
};

export default MenuLink;
