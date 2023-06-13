import { Link as RouterLink } from 'react-router-dom';
import navLinks from './HeaderMenu/NavLinks';
import { Grid, Link, MenuItem, Paper } from '@mui/material';
import MenuLink from './HeaderMenu/MenuLink/MenuLink';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import { FormattedMessage } from 'react-intl';

export const getDrawerChoices = (activePath: string) => {
    // Accept activePath as parameter
    return navLinks.map(({ id, title, path }) => {
        return (
            <MenuItem key={id}>
                <MenuLink
                    name={<FormattedMessage id={`${title}`} />}
                    href={path}
                    isActive={path === activePath}
                />{' '}
                {/* Pass isActive prop */}
            </MenuItem>
        );
    });
};

export const displayDesktop = () => {
    return (
        <Paper>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item sm={5} textAlign="center">
                    <HeaderTitle />
                </Grid>
                <Grid item sm={2}></Grid>
                <Grid item sm={5}>
                    <HeaderMenu />
                </Grid>
            </Grid>
        </Paper>
    );
};
