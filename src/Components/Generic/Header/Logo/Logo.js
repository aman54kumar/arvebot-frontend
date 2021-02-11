import React from "react";
// import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import mainLogo from "../../../../images/logo.svg";
import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={mainLogo} alt="Arvebot Logo" />
    </div>
  );
};

export default Logo;

// logo url
// https://pixabay.com/vectors/logo-bird-vector-swinging-design-1933884/
