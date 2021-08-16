// import { createMuiTheme } from "@material-ui/core";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#014777",
    },

    // typography: {
    //   root: {
    //     fontFamily: "Croissant One",
    //   },
    // },
  },
});

export default theme;
