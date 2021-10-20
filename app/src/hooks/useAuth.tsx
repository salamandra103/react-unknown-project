import { useRef, useEffect, useState } from 'react'

const useAuth = () => {
    const [isAuth, setAuth] = useState(false)

    return { isAuth, setAuth };
}

export default useAuth;