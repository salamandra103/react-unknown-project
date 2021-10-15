import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios'

import api from "@/utils/api"

import style from '@styles/pages/SignIn.module.scss'


interface State {
    login: string,
    password: string,
    isRegister: boolean
}

interface User {
    login: string,
    password: string
}

const SignIn = (props: RouteComponentProps): JSX.Element => {
    const history = useHistory();

    const [state, setState] = useState<State>({
        login: '',
        password: '',
        isRegister: props.match.path === '/register'
    });

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        // let users = localStorage.getItem('registerUserList');
        // let parseUsers = (users && JSON.parse(users)) || [];

        if (state.isRegister) {
            let { data }: AxiosResponse<any[]> = await api.post('auth/signup', {
                email: state.login,
                password: state.password
            });
            console.log(data);


            // if (parseUsers.length) {
            //     parseUsers.find(({ login, password }: User) => {
            //         if (login === state.login) {
            //             throw new Error(`Пользователь ${login} уже существует`)
            //             return true;
            //         } else {
            //             localStorage.setItem('registerUserList', JSON.stringify([...parseUsers, {
            //                 login: state.login,
            //                 password: state.password
            //             }]))
            //             history.push('/signin')
            //         }
            //     })
            // } else {
            //     localStorage.setItem('registerUserList', JSON.stringify([{
            //         login: state.login,
            //         password: state.password
            //     }]))
            //     history.push('/signin')
            // }
        }
        else {
            let { data }: AxiosResponse<any[]> = await api.post('auth/login', {
                email: state.login,
                password: state.password
            });
            localStorage.setItem('user', JSON.stringify(data))
            // if (parseUsers.length) {
            //     parseUsers.find(({ login, password }: User) => {
            //         if (login === state.login) {
            //             if (password === state.password) {
            //                 history.push('/')
            //             }
            //         }
            //     })
            // } else {
            //     throw new Error('Пользователь не найден')
            // }
        }

    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
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
                            <input name="login" type="text" placeholder="Enter login" defaultValue={state.login} onChange={handleChange} />
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