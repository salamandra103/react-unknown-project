import React, { useState, useRef, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

import style from '@styles/components/Chat.module.scss'

interface State {
    currentUser: string,
    messages: Array<{
        text: string,
        author: string,
        id: number
    }>
}

const Chat = () => {
    const socketRef = useRef<Socket | null>(null);
    const [state, setState] = useState<State>({
        currentUser: 'user_1',
        messages: [
            {
                text: 'Message 1',
                author: 'user_1',
                id: 1,
            },
            {
                text: 'Message 2',
                author: 'user_1',
                id: 2,
            },
            {
                text: 'Message 3 of other user',
                author: 'user_2',
                id: 3,
            },
            {
                text: 'Message 4',
                author: 'user_1',
                id: 4,
            }
        ],
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value.trim()
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
    }

    useEffect(() => {
        socketRef.current = io("http://localhost:3001");
    }, [])

    return (
        <div className={style.chat}>
            <h3>Chat</h3>
            <div className="messages">
                <div className="messages__container">
                    <div className="messages__list">
                        {state.messages.map(item => {
                            return (
                                <div key={item.id} className={`messages__item ${item.author === state.currentUser ? 'messages__item_right' : ''}`}>
                                    <span>Author: {item.author}</span>
                                    <span>Text: {item.text}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea name="chatform" cols={30} rows={10} placeholder="Введите текст" onChange={handleChange}></textarea>
                <button type="submit"></button>
            </form>
        </div>
    )
}

export default Chat
