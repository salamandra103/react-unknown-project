import React from 'react';

// interface AuthContext {
//     auth: boolean
// }

export const AuthContext = React.createContext<{
    isAuth: boolean | null,
    setAuth: any
} | null>(null)