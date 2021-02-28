import React from "react";
import { Grid } from "@material-ui/core";
import MenuLink from "./MenuLink/MenuLink";
import NavLinks from "./NavLinksProd.js";

const HeaderMenu = () => {
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {NavLinks.map(({ id, title, path }) => {
        return (
          <Grid item key={id}>
            <MenuLink name={title} href={path} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HeaderMenu;
