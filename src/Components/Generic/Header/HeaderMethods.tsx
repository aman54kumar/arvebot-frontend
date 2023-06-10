import { Link as RouterLink} from "react-router-dom";
import navLinks from "./HeaderMenu/NavLinks";
import { Grid, Link, MenuItem, Toolbar } from "@mui/material";
import MenuLink from "./HeaderMenu/MenuLink/MenuLink";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import { FormattedMessage } from "react-intl";


export const getDrawerChoices = (activePath: string) => { // Accept activePath as parameter
    return navLinks.map(({ id, title, path }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: path,
            color: "inherit",
            style: { textDecoration: "none" },
            key: id,
          }}
        >
          <MenuItem>
            <MenuLink name={<FormattedMessage id={`${title}`} />} href={path} isActive={path === activePath} /> {/* Pass isActive prop */}
          </MenuItem>
        </Link>
      );
    });
  };

  export const displayDesktop = () => {
    return (
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Grid item sm={6}>
            <HeaderTitle />
          </Grid>
          <Grid item sm={6}>
            <HeaderMenu />
          </Grid>
        </Grid>
      </Toolbar>
    );
  };
  
  
