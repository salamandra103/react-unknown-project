import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { RouteComponentProps } from "react-router";

import Tabs from '@/components/Tabs'

import { AuthContext } from '@/contexts/auth';
import api from "@/utils/api"

import style from '@styles/pages/Profile.module.scss'

interface State {
    name: string,
    surname: string,
    age: number | null,
    city: string,
    password: '',
    confirmPassword: '',
}

const Profile = (props: RouteComponentProps): JSX.Element => {
    const auth = useContext(AuthContext);
    const [state, setState] = useState<State>({
        name: '',
        surname: '',
        age: null,
        city: '',
        password: '',
        confirmPassword: '',
    });

    const isConfirmSuccess = useMemo<boolean>(() => {
        if ((state.password.length && state.confirmPassword.length) && state.password === state.confirmPassword) {
            return true;
        }
        return false;
    }, [state.password, state.confirmPassword])

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let endpoint = '';
        let data = {};

        switch (e.currentTarget.id) {
            case 'personalForm':

                endpoint = `user/?id=${auth.user.id}`
                data = {
                    name: state.name,
                    surname: state.surname,
                    age: state.age,
                    city: state.city,
                }
                break;
            case 'authorizationForm':
                if (!isConfirmSuccess) {
                    throw "Пароли не совпадают"
                }
                endpoint = `user/password?id=${auth.user.id}`
                data = {
                    password: state.password
                }
                break;
            default:
                break;
        }

        try {
            await api.post(endpoint, data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`user/`, {
                    params: {
                        id: auth.user?.id
                    }
                });
                setState({
                    ...state,
                    name: data.personal.name,
                    surname: data.personal.surname,
                    age: data.personal.age,
                    city: data.personal.city,
                });
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    return (
        <section className={style.profile}>
            <div className="container">
                <div className="wrapper">
                    <div className="profile__container">
                        <Tabs defaultActiveTabId={0}>
                            <div className="profile__row" data-tab-title="Main info">
                                <div className="profile__block">
                                    <p className="title">Personal info</p>
                                    <form className="profile__form" id="personalForm" onSubmit={handleSubmit}>
                                        <label className="profile__form-field">
                                            <span>Name:</span>
                                            <input name="name" type="text" placeholder="Enter your name" onChange={handleChange} value={state.name} className="profile__form-input" />
                                        </label>
                                        <label className="profile__form-field">
                                            <span>Surname:</span>
                                            <input name="surname" type="text" placeholder="Enter your surname" onChange={handleChange} value={state.surname} className="profile__form-input" />
                                        </label>
                                        <label className="profile__form-field">
                                            <span>Age:</span>
                                            <input name="age" type="text" placeholder="Enter your age" onChange={handleChange} value={state.age || ''} className="profile__form-input" />
                                        </label>
                                        <label className="profile__form-field">
                                            <span>City:</span>
                                            <input name="city" type="text" placeholder="Enter your city" onChange={handleChange} value={state.city} className="profile__form-input" />
                                        </label>
                                    </form>
                                    <button type="submit" className="profile__submit" form="personalForm">Save profile</button>
                                </div>
                                <div className="profile__block">
                                    <p className="title">Password</p>
                                    <form className="profile__form" id="authorizationForm" onSubmit={handleSubmit}>
                                        <label className="profile__form-field">
                                            <span>Password:</span>
                                            <input name="password" type="password" placeholder="Enter password" onChange={handleChange} value={state.password} className="profile__form-input" />
                                        </label>
                                        <label className="profile__form-field">
                                            <span>Confirm password:</span>
                                            <input name="confirmPassword" type="password" placeholder="Confirm password" onChange={handleChange} value={state.confirmPassword} className="profile__form-input" />
                                        </label>
                                    </form>
                                    <button type="submit" className="profile__submit" form="authorizationForm">Save new password</button>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Profile