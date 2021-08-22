import React from 'react'

import Navigation from '@/components/Navigation'

const LoginLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <>
            <Navigation />
            {children}
        </>
    )
}

export default LoginLayout
