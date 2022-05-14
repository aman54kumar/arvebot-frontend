import { ReactElement } from "react";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
// import LangButton from "./LangButton/LangButton";

interface propsTypes {
  description: string;
  title: string;
}

const Copyright = (): ReactElement => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Arvebot
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles(() => ({
  footer: {
    // backgroundColor: theme.palette.background.paper,
    padding: useTheme().spacing(6),
    backgroundColor: "silver"
  },
}));

const Footer = (props: propsTypes): ReactElement => {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <Paper className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        {description}
      </Typography>
      <Copyright />

      {/* {Object.keys(props.langValue).map((lang) => (
        <LangButton
          key={lang}
          langButtonValue={props.langValue[lang]}
          sendDataToParent={props.sendDataToParent}
        />
      ))} */}
    </Paper>
  );
};

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default Footer;
