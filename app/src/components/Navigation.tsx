import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '@/contexts/auth';

import style from '@styles/components/Navigation.module.scss'

import routes from "@/routes";

const Navigation = () => {
    const isNavRoutes = routes.filter(route => route.options && route.options.isNav);
    const auth = useContext(AuthContext)
    console.log(style);

    return (
        <div className={style.navigation}>
            <nav>
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
                <span className="tools__icon">
                    <span></span>
                </span>
                {/* <ul className="tools-list">
                    <li className="tools-list__item settings">Settings</li>
                    <li className="tools-list__item exit">Exit</li>
                </ul> */}
            </div>
        </div>
    )
}

export default Navigation
