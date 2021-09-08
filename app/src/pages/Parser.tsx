import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import axios from 'axios'

import { useDebounce } from '@/hooks/useDebounce'
import { usePrevious } from '@/hooks/usePrevious'

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

    const [count, setCount] = useState(0);
    const [res, setRes] = useState(0);

    const debouncedSearchTerm = useDebounce(state.searchUrl, 1000)

    const handleChangeSearchInput = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
        setCount(count + 1)
    }

    const d = () => {
        return count * count
    }

    let val1 = useMemo(() => d(), [count])

    useEffect(() => {
        setRes(d)
    }, [count]);


    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/parser').then(({ data }) => {
    //         console.log(data);
    //         // setState({
    //         //     ...state,
    //         //     html: data
    //         // })
    //     })
    //     // if (debouncedSearchTerm.length) {
    //     //     fetch('https://jsonplaceholder.typicode.com/posts/1')
    //     //         .then(async (response) => {
    //     //             let json = await response.json();
    //     //             setState({
    //     //                 ...state,
    //     //                 data: {
    //     //                     ...json
    //     //                 }
    //     //             });
    //     //         })
    //     // } else {
    //     //     setState({
    //     //         ...state,
    //     //         data: {}
    //     //     });
    //     // }
    // }, [debouncedSearchTerm])

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
