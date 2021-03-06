import React from 'react';
import Main from '@/pages/Main'
import SignIn from '@/pages/SignIn'
import Profile from '@/pages/Profile'
import Error404 from '@/pages/Error404'

import LoginLayout from '@/layouts/LoginLayout'
import LogoutLayout from '@/layouts/LogoutLayout'
import { RouteComponentProps, Router } from 'react-router';


const routes: {
    path?: string,
    title?: string
    component: (props: RouteComponentProps) => JSX.Element,
    requiredAuth?: boolean,
    layout?: ({ ...props }) => JSX.Element,
    payload?: {
        [x: string]: any
    },
    options?: {
        isNav: boolean
    }
}[] = [
        {
            path: '/',
            title: 'Main',
            component: Main,
            requiredAuth: true,
            layout: LoginLayout,
            options: {
                isNav: true
            }
        },
        {
            path: '/profile',
            title: "Profile",
            component: Profile,
            requiredAuth: true,
            layout: LoginLayout,
        },
        {
            path: '/signin',
            title: 'SignIn',
            component: SignIn,
            layout: LogoutLayout,
            options: {
                isNav: true
            }
        },
        {
            path: '/registration',
            component: SignIn,
            layout: LogoutLayout
        },
        {
            path: '*',
            component: Error404,
        },
    ];
export default routes;