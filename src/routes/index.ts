import React from 'react';
import Main from '@/pages/Main'
import SignIn from '@/pages/SignIn'
import Parser from '@/pages/Parser'
import Error404 from '@/pages/Error404'

import LoginLayout from '@/layouts/LoginLayout'
import LogoutLayout from '@/layouts/LogoutLayout'
import { RouteComponentProps, Router } from 'react-router';


const routes: {
    path: string,
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
            requiredAuth: false,
            layout: LoginLayout,
            options: {
                isNav: true
            }
        },
        {
            path: '/parser',
            title: 'Parser',
            component: Parser,
            requiredAuth: false,
            layout: LoginLayout,
            options: {
                isNav: true
            }
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
            path: '/register',
            component: SignIn,
            layout: LogoutLayout
        },
        {
            path: '/*',
            component: Error404,
        },
    ];
export default routes;