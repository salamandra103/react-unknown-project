import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import axios from 'axios'

import { debounce } from '@/utils/debounce'
import { usePrevious } from '@/hooks/usePrevious'
import { useFirstMount } from '@/hooks/useFirstMount'

import style from '@styles/pages/Parser.module.scss'

interface State {
    searchUrl: string,
    searchTag: string,
    data: any,
    html: Array<any>
}

const Parser = (props: RouteComponentProps): JSX.Element => {
    const [state, setState] = useState<State>({
        searchUrl: '',
        searchTag: '',
        data: {},
        html: []
    })

    const isFirstMount = useFirstMount();

    const handleChangeSearchInput = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
        debounceFetchParser()
    }

    const debounceFetchParser = useCallback(debounce(() => {
        axios.get('http://localhost:3001/api/parser').then(({ data }) => {
            console.log(data);
        })
        // setState({
        //     ...state,
        //     html: data
        // })
    }, 500), [])


    useEffect(() => {
        if (!isFirstMount) {
            debounceFetchParser()
        }
    }, [state.searchUrl])

    return (
        <section className={style.parse}>
            <div className="container">
                <div className="wrapper">
                    <div className="block block_search">
                        <input
                            type="text"
                            name="searchUrl"
                            defaultValue={state.searchUrl}
                            onChange={handleChangeSearchInput}
                            placeholder="Введите URL сайта для парсинга"
                        />
                    </div>
                    <div className="block block_settings block_search">
                        <input
                            type="text"
                            name="searchTag"
                            defaultValue={state.searchTag}
                            onChange={handleChangeSearchInput}
                            placeholder="Введите селектор который нужно спарсить"
                        />
                    </div>
                    <button className="button button_submit" onClick={handleSubmit}>Найти</button>


                    <div className="block block_result">
                        {
                            Object.keys(state.data).length ? Object.keys(state.data).map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <p >{item}: {state.data[item]}</p>
                                        <br />
                                    </React.Fragment>
                                )
                            }) : null
                        }

                        {
                            state.html.map((item) => {
                                return item.html
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Parser
