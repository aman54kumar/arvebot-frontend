import { ReactElement } from "react";
import { Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

const root = {
  fontFamily: '"Abril Fatface", serif',
  color: "#016196",
};

const useStyles = makeStyles({ root });
const HeaderTitle = (): ReactElement => {
  const classes = useStyles();

  return (
    <Typography variant="h2" className={classes.root} noWrap>
      ARVEBOT
    </Typography>
  );
};

export default HeaderTitle;
