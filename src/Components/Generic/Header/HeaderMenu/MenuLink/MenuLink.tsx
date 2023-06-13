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
