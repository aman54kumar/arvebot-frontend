import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { FormattedMessage } from "react-intl";
import LangButton from "./LangButton/LangButton";

function Copyright() {
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
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <Container maxWidth="lg" className={classes.footer}>
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
      <p>
        <FormattedMessage
          id="nameText"
          defaultMessage="Hello"
        ></FormattedMessage>
      </p>
      {/* <LangButton
        onClickListener={props.onLanguageChange}
        langButtonValue={props.langValue}
      /> */}
      {Object.keys(props.langValue).map((lang) => (
        // console.log(lang)
        <LangButton
          key={lang}
          langButtonValue={props.langValue[lang]}
          sendDataToParent={props.sendDataToParent}
        />
      ))}
      ;{/* <p>{placeText}</p> */}
      {/* <Button onClick={() => handleClick("nb")}>Norsk</Button>
      <Button onClick={() => handleClick("en")}>English</Button> */}
    </Container>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default Footer;
