import React from 'react'
import { NavLink } from 'react-router-dom'

import style from '@/assets/styles/components/Navigation.module.scss'

const Navigation = () => {
    return (
        <nav className={style.nav}>
            <ul className={style.ul}>
                <li className={style.li}>
                    <NavLink to="/" className={style.a}>Main</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink to="/signin" className={style.a}>SignIn</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
