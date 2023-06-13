import { useState, useEffect, ReactElement } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { AppBar, IconButton, Drawer, Paper, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import { displayDesktop, getDrawerChoices } from './HeaderMethods';

const useStyles = makeStyles({
    header: {
        backgroundColor: 'white',
        borderRadius: '1rem',
    },
    '@media (max-width: 900px)': {
        paddingLeft: 0,
    },
    drawerContainer: {
        padding: '20px 30px',
    },
    menuIconRoot: {
        color: '#4151C9',
    },
});

// Main Header component
const Header = (): ReactElement => {
    // State variables
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });
    const { mobileView, drawerOpen } = state;

    // State variable for active path
    const [activePath, setActivePath] = useState<string>(
        window.location.pathname,
    );

    // React Router's location object
    const location = useLocation();

    // Check the window size and set mobileView state accordingly
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 1386
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({
                      ...prevState,
                      mobileView: false,
                  }));
        };
        setResponsiveness();
        window.addEventListener('resize', () => setResponsiveness());
    }, []);

    // Close the drawer on location change
    useEffect(() => {
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
    }, [location.pathname]);

    const classes = useStyles();

    // Render the mobile view
    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleDrawerOpen}
                        size="large"
                    >
                        <MenuIcon className={classes.menuIconRoot} />
                    </IconButton>

                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={handleDrawerClose}
                    >
                        <div className={classes.drawerContainer}>
                            {getDrawerChoices(activePath)}{' '}
                        </div>
                    </Drawer>
                </Grid>
                <Grid item>
                    <HeaderTitle />
                </Grid>
            </Grid>
        );
    };

    return (
        <AppBar className={classes.header}>
            {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
    );
};

export default Header;
