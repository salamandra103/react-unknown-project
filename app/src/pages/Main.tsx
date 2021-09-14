import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router';

import SignIn from '@/pages/SignIn';
import Widget from '@/components/Widget';
import Chat from '@/components/Chat';

import style from "@styles/pages/Main.module.scss"


const Main = (props: RouteComponentProps): JSX.Element => {
    const [state, setState] = useState({
        list: [
            {
                name: 'Виджет 1',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eius.',
                createdDate: '10-12-2015',
                author: 'Name 1'
            },
            {
                name: 'Виджет 2',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eius.',
                createdDate: '31-01-2016',
                author: 'Name 2'
            },
            {
                name: 'Виджет 3',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus necessitatibus non molestiae soluta dolorem facere temporibus explicabo fugit magnam eos fuga iste illo, quidem officia corporis esse voluptatum alias ab.',
                createdDate: '06-06-2015',
                author: 'Name 3'
            }
        ]
    })

    return (
        <main className={style.main}>
            <div className="grid">
                {
                    state.list && state.list.map((item, index) => {
                        return (
                            <Widget {...item} key={index} />
                        )
                    })
                }
            </div>

            <Chat />
        </main>
    )
}

export default Main
