import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import style from './MenuLink.module.scss';
interface propsTypes {
    href: string;
    name: ReactElement;
}

const MenuLink = (props: propsTypes & { isActive: boolean }): ReactElement => {
    return (
        <NavLink
            to={props.href}
            className={style.MenuLinkItem}
            exact
            activeClassName={
                props.isActive ? style.activeMenuItem : 'style.inactiveMenuItem'
            }
        >
            {props.name}
        </NavLink>
    );
};

export default MenuLink;

// .MenuLinkItem {
//     font-family: "Work Sans", sans-serif;
//     // fontWeight: "300",
//     font-size: 1.3rem;
//     // color: '#4151C9';
//     color: black;
//     padding: 0 20px;
//     text-align: center;
//     text-decoration: none;
//     height: 100%;
// }

// .MenuLinkItem:before {
//     width: 110%;
//     left: -5%;
//     height: 5px;
//     border-radius: 3px;
//     background: lightsalmon;
//     position: absolute;
//     z-index: 1; /* Set a positive value */
//     bottom: 20px;
// }

// .MenuLinkItem::hover  {
//     color: #FFF5EE;
//     background-color: #87AFC7;
//     font-weight: bold;
// }
