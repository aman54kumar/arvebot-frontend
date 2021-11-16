import { Grid } from "@mui/material";
import MenuLink from "./MenuLink/MenuLink";
import NavLinks from "./NavLinks";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";

const HeaderMenu = (): ReactElement => {
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
