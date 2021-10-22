import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '@/contexts/auth';
import useAuth from "@/hooks/useAuth";

import style from '@styles/components/Navigation.module.scss'

import routes from "@/routes";

const Navigation = () => {
    const isNavRoutes = routes.filter(route => route.options && route.options.isNav);
    // const _auth = useContext(AuthContext)
    const _auth = useAuth();

    return (
        <nav className={style.nav}>
            <ul>
                {
                    isNavRoutes.map((route, index) => {
                        if (route.path) {
                            if (route.path === '/signin' && _auth.user) {
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
    )
}

export default Navigation
