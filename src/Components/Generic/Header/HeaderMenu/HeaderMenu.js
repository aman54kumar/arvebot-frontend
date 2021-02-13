import React from "react";
import MenuLink from "./MenuLink/MenuLink";

let NavLinks = "";
if ("./NavLinks.js") {
  NavLinks = require("./NavLinks.js");
} else {
  NavLinks = require("./NavLinksProd.js");
}
// import NavLinks from "./NavLinks";
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
