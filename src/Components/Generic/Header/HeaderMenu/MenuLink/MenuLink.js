import React from "react";
// import classes from "./MenuLink.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Roboto Slab', serif",
    fontWeight: "bold",
    fontSize: "1.3rem",
    color: "#4151C9",
    padding: "0 20px",
    textDecoration: "none",
    textAlign: "center",
  },
  rootActive: {
    backgroundColor: "#FCCABD",
    color: "black",
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
