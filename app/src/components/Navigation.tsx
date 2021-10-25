import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '@/contexts/auth';

import style from '@styles/components/Navigation.module.scss'

import routes from "@/routes";

const Navigation = () => {
    const isNavRoutes = routes.filter(route => route.options && route.options.isNav);
    const auth = useContext(AuthContext)

    return (
        <div className={style.navigation}>
            <nav className="menu">
                <ul>
                    {
                        isNavRoutes.map((route, index) => {
                            if (route.path) {
                                if (route.path === '/signin' && auth.user) {
                                    return null
                                } else {
                                    return (
                                        <li key={index}>
                                            <NavLink to={route.path}>{route.title}</NavLink>
                                        </li>
                                    )
                                }
                            }
                        })
                    }
                </ul>
            </nav>
            <div className="tools">
                {/* <button type="button" className="exit" onClick={auth.signout}>
                </button> */}

                <div className="tools-menu">
                    <span className="tools-menu__icon">
                        <span></span>
                    </span>
                    <div className="tools-menu__wrapper">
                        <ul className="tools-menu__list">
                            <li className="tools-menu__item settings">
                                <NavLink to="profile">
                                    <span>Settings</span>
                                </NavLink>
                            </li>
                            <li className="tools-menu__item exit">
                                <button type="button" onClick={auth.signout}>
                                    <span>Exit</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navigation
