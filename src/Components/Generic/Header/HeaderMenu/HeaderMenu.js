import React from "react";
import MenuLink from "./MenuLink/MenuLink";

let NavLinks;

if (document.location.href.split("//")[1] === "localhost:3000/") {
  NavLinks = require("./NavLinks.js");
} else {
  NavLinks = require("./NavLinksProd.js");
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
