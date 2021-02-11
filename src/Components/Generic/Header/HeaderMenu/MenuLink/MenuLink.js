import React from "react";
import { Button, Grid } from "@material-ui/core";
import classes from "./MenuLink.module.css";

const MenuLink = (props) => {
  return (
    <div className={classes.MenuLink}>
      <Grid item>
        <Button variant="text" href={props.href}>
          {props.name}
        </Button>
      </Grid>
    </div>
  );
};

export default MenuLink;
