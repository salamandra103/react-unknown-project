import React from 'react';
import Main from '@/pages/Main'
import SignIn from '@/pages/SignIn'

import LoginLayout from '@/layouts/LoginLayout'
import LogoutLayout from '@/layouts/LogoutLayout'
import { RouteComponentProps } from 'react-router';


const routes: {
    path: string,
    component: (props: RouteComponentProps) => JSX.Element,
    requiredAuth?: boolean,
    layout?: ({ ...props }) => JSX.Element,
    payload?: {
        [x: string]: any
    }
}[] = [
        {
            path: '/',
            component: Main,
            requiredAuth: true,
            layout: LoginLayout,
        },
        {
            path: '/signin',
            component: SignIn,
            layout: LogoutLayout
        },
        {
            path: '/register',
            component: SignIn,
            layout: LogoutLayout
        }
    ];
export default routes;