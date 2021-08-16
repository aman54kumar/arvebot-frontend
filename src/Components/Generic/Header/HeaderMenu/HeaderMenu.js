import React from "react";
import { Grid } from "@material-ui/core";
import MenuLink from "./MenuLink/MenuLink";
import NavLinks from "./NavLinks.js";
import { FormattedMessage } from "react-intl";

const HeaderMenu = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {NavLinks.map(({ id, title, path }) => {
        return (
          <Grid item key={id}>
            <MenuLink name={<FormattedMessage id={`${title}`} />} href={path} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HeaderMenu;
