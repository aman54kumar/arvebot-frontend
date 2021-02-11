import React from "react";
import { Grid } from "@material-ui/core";
import MenuLink from "./MenuLink/MenuLink";
import classes from "./HeaderMenu.module.css";
import NavLinks from "./NavLinks";

const HeaderMenu = () => {
  return (
    <div className={classes.HeaderMenu}>
      <Grid container>
        {NavLinks.map(({ id, title, path }) => (
          <MenuLink name={title} href={path} key={id} />
        ))}
      </Grid>
    </div>
  );
};

export default HeaderMenu;
