import { useState } from 'react'
import { AxiosResponse } from 'axios'

import api from "@/utils/api"


const useAuth = () => {
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user_info') || 'null'));

    const signup = async (email: string, password: string) => {
        try {
            let { data }: AxiosResponse<any> = await api.post('auth/signup', {
                email,
                password
            });
        } catch (error) {
            console.error(error);
        }
    }

    const signin = async (email: string, password: string) => {
        try {
            let { data }: AxiosResponse<any> = await api.post('auth/login', {
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

    const updateToken = async () => {
        try {
            const { data }: AxiosResponse<any> = await api.post("auth/token", {
                id: localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info") || '{}').id : "",
            });
            setUser(data);
            localStorage.setItem("user_info", JSON.stringify(data));
        } catch (error) {
            signout();
        }
    }

    return {
        user,
        signup,
        signin,
        signout,
        updateToken
    }

}

export default useAuth;