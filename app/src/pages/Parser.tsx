import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
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
        searchUrl: 'https://coinmarketcap.com/',
        searchTag: '',
        data: {},
        html: []
    })

    const frame = useRef<any>(null)

    const isFirstMount = useFirstMount();

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
        debounceFetchParser(state.searchUrl)
    }

    const selectElemet = async (e: React.FormEvent<HTMLButtonElement>): Promise<any> => {
        const { data } = await axios.get('http://localhost:3001/api/parser/getPage', {
            params: {
                url: encodeURI(state.searchUrl)
            }
        });
        setState({
            ...state,
            html: data
        })

        if (frame.current) {
            // frame.current.contentDocument.querySelector('body').innerHTML = "<div>dsadasd</div>"
            let frameDoc = frame.current.contentDocument;
            frameDoc.querySelector('body').innerHTML = data;
        }
    }

    const debounceFetchParser = useCallback(debounce(async (url) => {
        const { data } = await axios.get('http://localhost:3001/api/parser/parseElement', {
            params: {
                url: encodeURI(url)
            }
        });
    }, 1500), [])


    useEffect(() => {
        if (!isFirstMount) {
            debounceFetchParser(state.searchUrl)
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
                            onChange={handleChange}
                            placeholder="Введите URL сайта для парсинга"
                        />
                    </div>
                    <div className="block block_settings block_search">
                        <input
                            type="text"
                            name="searchTag"
                            defaultValue={state.searchTag}
                            onChange={handleChange}
                            placeholder="Введите селектор который нужно спарсить"
                        />
                    </div>

                    <div className="frame">
                        {
                            state.html.length ? <iframe ref={frame}></iframe> : <span>Загружаемый фрейм</span>

                        }
                    </div>

                    <button className="button button_submit" onClick={handleSubmit}>Найти</button>
                    <button className="button button_submit" onClick={selectElemet}>Выбрать элемент</button>


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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Parser
