import { useRef, useEffect, useState, useContext } from 'react'


const useAuth = (): { isAuth: boolean, updateUserHandler: (userInfo: any) => void } => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_info') || 'null'))
    const [isAuth, setAuth] = useState(false)

    const updateUserHandler = (userInfo: any) => {
        if (userInfo) {
            localStorage.setItem('user_info', JSON.stringify(userInfo));
            setUser(userInfo)
        } else {
            localStorage.removeItem('user_info');
            setUser(null)
        }
    }

    useEffect(() => {
        user ? setAuth(true) : setAuth(false)
    }, [user])

    return { isAuth, updateUserHandler };
}

export default useAuth;