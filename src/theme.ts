// import { createMuiTheme } from "@mui/material";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { adaptV4Theme } from "@mui/material/styles";
declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
const theme = createMuiTheme(
  adaptV4Theme({
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
  })
);

export default theme;
