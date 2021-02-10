import React from "react";
import { Grid } from "@material-ui/core";
import MenuLink from "./MenuLink/MenuLink";

const HeaderMenu = () => {
  return (
    <div>
      <Grid container>
        <Grid item>
          <MenuLink name="HOME" />
        </Grid>
        <Grid item>
          <MenuLink name="INHERITANCE CALCULATOR" />
        </Grid>
        <Grid item>
          <MenuLink name="ABOUT" />
        </Grid>
      </Grid>
    </div>
  );
};

export default HeaderMenu;
