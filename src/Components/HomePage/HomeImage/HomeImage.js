import React from "react";
import mainImage from "../../../images/homepage-image.jpg";
import classes from "./HomeImage.module.css";

const HomeImage = (props) => {
  return (
    <div className={classes.HomeImage}>
      <img src={mainImage} alt="woman-with-child" />
    </div>
  );
};

export default HomeImage;
