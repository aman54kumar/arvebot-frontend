import React from "react";
import MenuLink from "./MenuLink/MenuLink";
import NavLinks from "./NavLinks";

const HeaderMenu = () => {
  return (
    <div>
      {NavLinks.map(({ id, title, path }) => {
        return <MenuLink name={title} href={path} key={id} />;
      })}
    </div>
  );
};

export default HeaderMenu;
