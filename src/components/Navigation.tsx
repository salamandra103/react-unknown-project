import React from 'react'
import { NavLink } from 'react-router-dom'

import style from '@styles/components/Navigation.module.scss'

import routes from "@/routes";

const Navigation = () => {
    let isNavRoutes = routes.filter(route => route.options && route.options.isNav);

    return (
        <nav className={style.nav}>
            <ul>
                {
                    isNavRoutes.map((route, index) => (
                        <li key={index}>
                            <NavLink to={route.path}>{route.title}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navigation
