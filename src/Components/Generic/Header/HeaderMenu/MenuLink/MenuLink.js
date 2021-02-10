import React from "react";
import { Link } from "@material-ui/core";
import classes from "./MenuLink.module.css";

const MenuLink = (props) => {
  return (
    <div className={classes.MenuLink}>
      <Link variant="h6" underline="none" style={{ color: "#fff" }}>
        {props.name}
      </Link>
    </div>
  );
};

export default MenuLink;
