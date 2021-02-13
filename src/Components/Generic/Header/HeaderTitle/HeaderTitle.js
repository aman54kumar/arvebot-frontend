import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const root = {
  fontFamily: '"Croissant One", cursive',
  color: "white",
};

// const root2 = {
//   fontFamily: '"Croissant One", cursive',
//   color: "#9acd32",
// };

// let useStyles = {};

// const scrollColor = (scrollBool) => {
//   if (scrollBool) {
//     useStyles = makeStyles({
//       root1,
//     });
//   } else {
//     useStyles = makeStyles({ root2 });
//   }
// };
const useStyles = makeStyles({ root });
const HeaderTitle = (props) => {
  const classes = useStyles();

  return (
    <Typography variant="h1" className={classes.root} noWrap>
      ARVEBOT
    </Typography>
  );
};

export default HeaderTitle;
