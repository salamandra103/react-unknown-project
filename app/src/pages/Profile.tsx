import React from 'react'
import { RouteComponentProps } from "react-router";

import style from '@styles/pages/Profile.module.scss'

const Profile = (props: RouteComponentProps): JSX.Element => {
    return (
        <section className={style.profile}>
            <div className="container">
                <div className="wrapper">
                    <div className="profile__container">
                        <div className="profile__row">
                            <div className="profile__block">
                                <p className="title">Personal info</p>
                                <form className="profile__form" id="personalForm">
                                    <label className="profile__form-field">
                                        <span>Name:</span>
                                        <input type="text" placeholder="Enter your name..." className="profile__form-input" />
                                    </label>
                                    <label className="profile__form-field">
                                        <span>Surname:</span>
                                        <input type="text" placeholder="Enter your surname..." className="profile__form-input" />
                                    </label>
                                    <label className="profile__form-field">
                                        <span>Age:</span>
                                        <input type="text" placeholder="Enter your age..." className="profile__form-input" />
                                    </label>
                                    <label className="profile__form-field">
                                        <span>City:</span>
                                        <input type="text" placeholder="Enter your city..." className="profile__form-input" />
                                    </label>
                                </form>
                            </div>
                            <div className="profile__block">
                                <p className="title">Authorization data</p>
                                <form className="profile__form" id="authorizationForm">
                                    <label className="profile__form-field">
                                        <span>Email:</span>
                                        <input type="text" placeholder="Enter email..." className="profile__form-input" />
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
                            <button type="submit" className="profile__submit" form="authorizationForm">Сохранить настройки</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile