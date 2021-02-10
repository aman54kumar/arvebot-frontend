import React from "react";
// import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import mainLogo from "./logo.svg";
import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={mainLogo} alt="Arvebot Logo" />
    </div>
  );
};

export default Logo;

// https://pixabay.com/vectors/logo-bird-vector-swinging-design-1933884/
