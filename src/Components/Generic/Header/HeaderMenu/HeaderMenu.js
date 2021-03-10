import React from "react";
import { Grid, Menu } from "@material-ui/core";
import MenuLink from "./MenuLink/MenuLink";
import NavLinks from "./NavLinks.js";
import { FormattedMessage } from "react-intl";

const HeaderMenu = () => {
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {NavLinks.map(({ id, title, path }) => {
        const itemId = `Menu.${id}`;
        return (
          <Grid item key={id}>
            <MenuLink name={<FormattedMessage id={itemId} />} href={path} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HeaderMenu;
