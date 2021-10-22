import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios'

import api from "@/utils/api"
import { AuthContext } from '@/contexts/auth';
import useAuth from "@/hooks/useAuth";

import style from '@styles/pages/SignIn.module.scss'


interface State {
    email: string,
    password: string,
    isRegister: boolean
}

const SignIn = (props: RouteComponentProps): JSX.Element => {
    const history = useHistory();
    // const auth = useContext(AuthContext)
    // const _auth = useAuth();
    debugger

    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user_info') || 'null'));

    const [state, setState] = useState<State>({
        email: '',
        password: '',
        isRegister: props.match.path === '/register'
    });
    debugger

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (state.isRegister) {
            // _auth.signup(state.login, state.password);
            // history.push('/signin');
        } else {
            try {
                let { data }: AxiosResponse<any[]> = await api.post('auth/login', {
                    email: state.email,
                    password: state.password
                });
                setUser(data);
                localStorage.setItem('user_info', JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
            // _auth.signin(state.login, state.password);
            // history.push('/');
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    return (
        <div className={style.signin}>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <h3>{!state.isRegister ? 'SignIn' : 'Register'} </h3>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.field}>
                            <input name="email" type="text" placeholder="Enter login" defaultValue={state.email} onChange={handleChange} />
                        </div>
                        <div className={style.field}>
                            <input name="password" type="text" placeholder="Enter password" defaultValue={state.password} onChange={handleChange} />
                        </div>
                        <div className="container container_buttons">
                            <button type="submit">Enter</button>
                            {
                                !state.isRegister ? (<NavLink to='/register'>Register</NavLink>) : (<NavLink to='/signin'>Signin</NavLink>)
                            }

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn