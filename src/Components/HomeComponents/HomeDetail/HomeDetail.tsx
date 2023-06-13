import { ReactElement } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Grid, Typography } from '@mui/material';
import Typed from 'react-typed';

const useStyles = makeStyles({
    root: {
        color: 'white',
        fontFamily: '"Work Sans", sans-serif',
        textAlign: 'center',
        verticalAlign: 'middle',
        marginTop: '10rem',
    },
    highLightText: {
        fontFamily: '"Abril Fatface", serif',
        fontSize: '4rem',
        color: 'yellow',
    },
    rootDiv: {},
});

const HomeDetail = (): ReactElement => {
    const classes = useStyles();
    const textLines = [
        'hjelper deg å finne løsningen og relevant rettsgrunnlag.',
    ];
    return (
        <Grid
            container
            justifyContent="center"
            className="classes.rootDiv"
            direction="row"
        >
            <Grid item xs={11} sm={11} md={8}>
                <Typography
                    variant="h4"
                    align="center"
                    className={classes.root}
                >
                    Lurer du på hvem som arver Peder Ås når han dør? <br />
                    Hvor mye får kona og barna? Hva med stesønnen? <br />
                    Og hvor mye kan han testamentere til Lilleviks
                    fuglekikkerforening? <br /> <br />
                    <span className={classes.highLightText}>
                        BeregnArv
                    </span>{' '}
                    <Typed typeSpeed={50} strings={textLines}></Typed>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default HomeDetail;
