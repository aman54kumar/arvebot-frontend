import { Grid, Paper } from '@mui/material';
import Header from '../Header/Header';
import style from './HeaderContent.module.scss';
import { menuItems } from './MenuItems';

export const HeaderContent = () => {
    return (
        <Grid
            className={style.WrapperBox}
            container
            justifyContent="space-between"
        >
            <Grid className={style.HeaderBox} item>
                <Header />
            </Grid>
            <Grid className={style.ContentBox} item>
                <Paper className={style.rootPaper}>{menuItems}</Paper>
            </Grid>
        </Grid>
    );
};
