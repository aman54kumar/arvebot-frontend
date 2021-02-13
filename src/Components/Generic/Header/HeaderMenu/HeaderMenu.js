import React from "react";
import MenuLink from "./MenuLink/MenuLink";

const getCurrentLocation = () => {
  const rootHref = document.location.href;
  return rootHref.split("//")[1];
};

let NavLinks;
if (getCurrentLocation === "localhost:3000/") {
  NavLinks = require("./NavLinksProd.js");
} else {
  NavLinks = require("./NavLinks.js");
}

const HeaderMenu = () => {
  return (
    <div>
      {NavLinks["default"].map(({ id, title, path }) => {
        return <MenuLink name={title} href={path} key={id} />;
      })}
    </div>
  );
};

export default HeaderMenu;
