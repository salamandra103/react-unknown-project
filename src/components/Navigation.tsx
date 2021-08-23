import React from 'react'
import { NavLink } from 'react-router-dom'

import style from '@/assets/styles/components/Navigation.module.scss'

const Navigation = () => {
    return (
        <nav className={style.nav}>
            <ul>
                <li>
                    <NavLink to="/">Main</NavLink>
                </li>
                <li>
                    <NavLink to="/signin">SignIn</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
