import { useRef, useEffect, useState, useContext } from 'react'
import { AxiosResponse } from 'axios'

import api from "@/utils/api"


const useAuth = () => {
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user_info') || 'null'));

    const signup = async (email: string, password: string) => {
        try {
            let { data }: AxiosResponse<any[]> = await api.post('auth/signup', {
                email,
                password
            });
        } catch (error) {
            console.error(error);
        }
    }

    const signin = async (email: string, password: string) => {
        try {
            let { data }: AxiosResponse<any[]> = await api.post('auth/login', {
                email,
                password
            });
            setUser(data);
            localStorage.setItem('user_info', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }

    const signout = async () => {
        setUser(null);
        localStorage.removeItem('user_info');
    }
    debugger
    return {
        user,
        signup,
        signin,
        signout
    }

}

export default useAuth;