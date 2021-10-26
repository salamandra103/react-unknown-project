import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from "react-router";

import { AuthContext } from '@/contexts/auth';
import api from "@/utils/api"

import style from '@styles/pages/Profile.module.scss'

interface State {
    name: string,
    surname: string,
    age: number | null,
    city: string
}

const Profile = (props: RouteComponentProps): JSX.Element => {
    const auth = useContext(AuthContext);
    const [state, setState] = useState<State>({
        name: '',
        surname: '',
        age: null,
        city: ''
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post(`user/?id=${auth.user.id}`, {
                name: state.name,
                surname: state.surname,
                age: state.age,
                city: state.city,
            })
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
                        <div className="profile__row">
                            <div className="profile__block">
                                <p className="title">Personal info</p>
                                <form className="profile__form" id="personalForm" onSubmit={handleSubmit}>
                                    <label className="profile__form-field">
                                        <span>Name:</span>
                                        <input name="name" type="text" placeholder="Enter your name..." onChange={handleChange} value={state.name} className="profile__form-input" />
                                    </label>
                                    <label className="profile__form-field">
                                        <span>Surname:</span>
                                        <input name="surname" type="text" placeholder="Enter your surname..." onChange={handleChange} value={state.surname} className="profile__form-input" />
                                    </label>
                                    <label className="profile__form-field">
                                        <span>Age:</span>
                                        <input name="age" type="text" placeholder="Enter your age..." onChange={handleChange} value={state.age || ''} className="profile__form-input" />
                                    </label>
                                    <label className="profile__form-field">
                                        <span>City:</span>
                                        <input name="city" type="text" placeholder="Enter your city..." onChange={handleChange} value={state.city} className="profile__form-input" />
                                    </label>
                                </form>
                            </div>
                            <div className="profile__block">
                                <p className="title">Authorization data</p>
                                <form className="profile__form" id="authorizationForm">
                                    <label className="profile__form-field">
                                        <span>Email:</span>
                                        <input type="text" disabled placeholder="Enter email..." className="profile__form-input" />
                                    </label>
                                    <label className="profile__form-field">
                                        <span>Password:</span>
                                        <input type="password" placeholder="Enter password..." className="profile__form-input" />
                                    </label>
                                    <label className="profile__form-field">
                                        <span>Confirm password:</span>
                                        <input type="password" placeholder="Confirm password..." className="profile__form-input" />
                                    </label>
                                </form>
                            </div>
                        </div>
                        <div className="profile__row">
                            <button type="submit" className="profile__submit" form="personalForm">Сохранить настройки</button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Profile