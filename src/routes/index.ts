import React from 'react';
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'

import LoginLayout from '@/layouts/LoginLayout'
import LogoutLayout from '@/layouts/LogoutLayout'
import { RouteComponentProps } from 'react-router';


const routes: {
    path: string,
    component: (props: RouteComponentProps) => JSX.Element,
    requiredAuth?: boolean,
    layout?: ({ ...props }) => JSX.Element
}[] = [
        {
            path: '/',
            component: Main,
            requiredAuth: true,
            layout: LoginLayout
        },
        {
            path: '/signin',
            component: SignIn,
            layout: LogoutLayout

        }
    ];

export default routes;