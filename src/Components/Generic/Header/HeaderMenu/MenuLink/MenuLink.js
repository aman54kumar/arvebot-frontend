import React from "react";
import classes from "./MenuLink.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Roboto Slab', serif",
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "white",
    padding: "0 20px",
    textDecoration: "none",
    textAlign: "center",
  },
});

const MenuLink = (props) => {
  const classes1 = useStyles(props);
  return (
    <NavLink
      to={props.href}
      className={(classes.MenuLink, classes1.root)}
      exact
      activeClassName={classes.active}
    >
      {props.name}
    </NavLink>
  );
};

export default MenuLink;
