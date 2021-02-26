import React from "react";
import { Grid } from "@material-ui/core";
import MenuLink from "./MenuLink/MenuLink";

let NavLinks;

if (document.location.href.split("//")[1] === "localhost:3000/") {
  NavLinks = require("./NavLinks.js");
} else {
  NavLinks = require("./NavLinksProd.js");
}

const HeaderMenu = () => {
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {NavLinks["default"].map(({ id, title, path }) => {
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
